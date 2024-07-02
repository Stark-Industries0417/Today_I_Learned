
``` java
Map<Enum, Set<Plant> plantsByLifeCycle 
= new EnumMap<>(Plant.LifeCycle.class);

for (LifeCycle lc : LifeCycle.values())
	plantsByLifeCycle.put(lc, new HashSet());
for (Plant p : garden)
	plantsByLifeCycle.get(p.lifeCycle).add(p);
```

#effective-java 