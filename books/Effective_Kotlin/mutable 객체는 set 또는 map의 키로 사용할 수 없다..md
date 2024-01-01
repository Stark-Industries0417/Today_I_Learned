> [!info]
> 해시 테이블은 처음 요소를 넣을 때 요소의 값을 기반으로 버킷을 결정하기 때문이다.
> 따라서 요소에 수정이 일어나면 해시 테이블 내부에서 요소를 찾을 수 없게된다.

``` kotlin
val names: SortedSet<FullName> = TreeSet()
val person = FullName("AAA", "AAA")
names.add(person)
names.add(FullName("Jordan", "Hansen"))
names.add(FullName("David", "Blanc"))

print(names) // [AAA AAA, David Blanc, Jordan Hansen]
print(person in names) // true

person.name = "ZZZ"
print(names) // [ZZZ AAA, David Blanc, Jordan Hansen]
print(person in names) // false

처음 요소의 값을 기준으로 버킷을 결정하기 때문에 수정이 일어나면 요소를 찾을 수 없게 된다.
```

effective kotlin - 14p

#effective 