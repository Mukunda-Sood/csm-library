---
name: ekx-sparql-query-builder
description: "Guides EKX to construct, optimise, and execute well-formed SPARQL queries against the SAP Knowledge Graph. Covers anchoring patterns, filter strategies, and result interpretation."
version: 1.0.0
author: CSMS Team
tool: EKX
tags:
  - SPARQL
  - knowledge-graph
  - queries
  - optimisation
---

# EKX SPARQL Query Builder Skill

This skill equips EKX with the knowledge to construct efficient, well-targeted SPARQL queries against the SAP Knowledge Graph (KG). Use it when you need structured, relationship-aware data retrieval that goes beyond keyword search.

---

## When to Use This Skill

- You need to traverse specific relationships between entities (e.g., find all processes linked to a given capability).
- You need to filter entities by type, property value, or domain code.
- `search_kg()` returns too many results and you need precise, structured narrowing.
- You want to explore the property structure of an unknown entity type.
- You need to verify or confirm data lineage (derivatives, source mappings).

---

## Core Principles

### 1. Always Anchor Queries

Every SPARQL query MUST anchor at least one variable to a known URI, type, or literal value. Unbounded patterns like `?s ?p ?o` without constraints will time out on large graphs.

```sparql
# BAD — unbounded, will time out
SELECT ?s ?p ?o WHERE { ?s ?p ?o }

# GOOD — anchored to a known type
SELECT ?s ?label WHERE {
  ?s rdf:type <https://ekg.cloud.sap/core/Process> ;
     rdfs:label ?label .
} LIMIT 20
```

### 2. Use LIMIT Liberally

Always add a `LIMIT` clause. Start with 10–20 results to understand the data shape, then increase as needed. Never run open queries without a limit.

```sparql
SELECT ?entity ?label WHERE {
  ?entity rdf:type <https://ekg.cloud.sap/core/Type> ;
          rdfs:label ?label .
  FILTER(LANG(?label) = "en")
} LIMIT 10
```

### 3. Never Use DISTINCT or ORDER BY

These operators are expensive on large graphs. Avoid them unless strictly required, and prefer filtering instead.

### 4. Use VALUES for Multi-URI Lookups

When you need to query several specific URIs at once, use `VALUES` rather than multiple separate queries.

```sparql
SELECT ?s ?p ?o WHERE {
  VALUES ?s {
    <https://ekg.cloud.sap/sap/SCS/SomeEntity>
    <https://ekg.cloud.sap/sap/KMM/AnotherEntity>
  }
  ?s ?p ?o .
} LIMIT 50
```

### 5. Use FILTER to Narrow Early

Apply `FILTER` as early in the query as possible to reduce the working set before joining.

```sparql
SELECT ?entity ?label WHERE {
  ?entity rdf:type ?type ;
          rdfs:label ?label .
  FILTER(CONTAINS(LCASE(STR(?label)), "procurement"))
  FILTER(LANG(?label) = "en" || LANG(?label) = "")
} LIMIT 20
```

---

## Common Query Patterns

### Pattern 1: Explore an Entity's Properties

Use this to understand the full property set of a specific entity URI.

```sparql
SELECT ?predicate ?object WHERE {
  <ENTITY_URI_HERE> ?predicate ?object .
} LIMIT 100
```

### Pattern 2: Find Instances of a Type

```sparql
SELECT ?instance ?label WHERE {
  ?instance rdf:type <TYPE_URI_HERE> ;
            rdfs:label ?label .
  FILTER(LANG(?label) = "en" || LANG(?label) = "")
} LIMIT 30
```

### Pattern 3: Traverse a Relationship

```sparql
SELECT ?related ?label WHERE {
  <SOURCE_ENTITY_URI> <RELATION_URI> ?related .
  ?related rdfs:label ?label .
  FILTER(LANG(?label) = "en" || LANG(?label) = "")
} LIMIT 30
```

### Pattern 4: Discover Relationship Types on an Entity

When you don't know which predicates connect to an entity, retrieve them first.

```sparql
SELECT ?predicate (COUNT(?o) AS ?count) WHERE {
  <ENTITY_URI_HERE> ?predicate ?o .
} GROUP BY ?predicate
LIMIT 50
```

### Pattern 5: Find Derivatives Across Sources

```sparql
SELECT ?derivative ?label WHERE {
  ?derivative ?p <ORIGINAL_ENTITY_URI> .
  FILTER(CONTAINS(LCASE(STR(?p)), "isderivativeof"))
  ?derivative rdfs:label ?label .
} LIMIT 20
```

### Pattern 6: Search by Domain Code

All entities in a domain have a URI containing that domain's code (e.g., `/SAP/KMM/SCS/`). Use this to scope queries.

```sparql
SELECT ?entity ?label WHERE {
  ?entity rdf:type <TYPE_URI> ;
          rdfs:label ?label .
  FILTER(CONTAINS(STR(?entity), "/KMM/"))
  FILTER(LANG(?label) = "en" || LANG(?label) = "")
} LIMIT 20
```

---

## Debugging Failed Queries

If a query returns no results, simplify it step by step:

1. Remove all `FILTER` clauses — does it return results?
2. Remove optional `OPTIONAL` clauses — does it return results?
3. Check URIs for typos — copy them directly from `search_kg()` results.
4. Check predicate names — use Pattern 4 above to discover actual predicates first.
5. Try a broader type — is the entity typed differently than expected?

---

## Integration with search_kg()

Use `search_kg()` as your first step to discover entity URIs, then use `execute_sparql()` for precise traversal.

```python
# Step 1: Discover URIs
results = search_kg("procurement process SAP S/4HANA")

# Step 2: Use URI in SPARQL
sparql = """
SELECT ?p ?o WHERE {
  <DISCOVERED_URI> ?p ?o .
} LIMIT 50
"""
execute_sparql(sparql)
```

---

## Output Formatting

When presenting SPARQL results to the user:
- Group properties by category (labels, types, relationships, metadata).
- Highlight the most semantically meaningful predicates first.
- Always show the source URI so the user can verify.
- Flag any `OPTIONAL` results that returned no data.

---

## Version History

| Version | Date       | Author      | Notes                          |
|---------|------------|-------------|--------------------------------|
| 1.0.0   | 2026-06-17 | CSMS Team   | Initial release                |
