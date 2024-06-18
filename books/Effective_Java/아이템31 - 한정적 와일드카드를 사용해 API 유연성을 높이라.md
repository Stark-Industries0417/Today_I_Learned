``` java
public static <E> void swap(List<E> list, int i, int j);
public static void swap(List<?> list, int i, int j);

public API 라면 2번째가 낫다.

메서드 선언에 타입 매개변수가 한 번만 나오면 와일드 카드로 대체하라
	- 비한정적 타입 매개변수라면 비한정적 와일드카드로 바꾸고
	- 한정적 타입 매개변수라면 한정적 와일드카드로 바꾸면 된다.

public static void swap(List<?> list, int i, int j) {
	list.set(i, list.set(j, list.get(i)));
}
컴파일 되지 않는다. 와일드 카드 타입은 null 외엔 어떤 값도 넣을 수 없기 때문이다.

형 변환이나 리스트의 로 타입을 사용하지 않고도 해결할 길이 있다.
와일드카드 타입의 실제 타입을 알려주는 private 도우미 메서드를 이용하는 것이다.

public static void swap(List<?> list, int i, int j) {
	swapHelper(list, i, j)
}

// 와일드카드 타입을 실제 타입으로 바꿔주는 private 도우미 메서드
private static <E> void swapHelper(List<E> list, int i, int j) {
	list.set(i, list.set(j, list.get(i)));
}

```


#effective-java 