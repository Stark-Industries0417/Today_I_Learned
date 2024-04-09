> [!info] Comparable을 구현했다는 것은 그 클래스의 인스턴스들 사이엔 자연적인 순서가 있음을 의미

## 비교자 생성 메서드 활용한 비교자
``` java
private static final Comparator<PhoneNumber> COMPARATOR = 
	comparingInt((PhoneNumber pn) -> pn.areaCode)
		.thenComparingInt(pn -> pn.prefix)
		.thenComparingInt(pn -> pn.lineNum);

public int compareTo(PhoneNumber pn) {
	return COMPARATOR.compare(this, pn);
}
```


> [!summary] 핵심 정리
> 순서를 고려해야 하는 값 클래스를 작성한다면 Comparable 인터페이스를 구현해서
> 쉽게 정렬하고, 검색하고, 비교 기능을 제공하는 컬렉션과 어우러지도록 하라
> compareTo 메서드에서 필드의 값을 비교할 때 <, > 연산자는 쓰지 말고
> 박싱된 기본 타입 클래스가 제공하는 정적 compare
> ex) Integer.compare(a, b) 사용하거나
> Comparator.comparingInt(o -> o.hashCode())를 사용하라

#effective-java 