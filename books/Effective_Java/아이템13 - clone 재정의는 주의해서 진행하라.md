## 해쉬 테이블의 clone 메서드
``` java
잘못된 clone 메서드 - 가변 상태 공유
@Override public HashTable clone() {
	try {
		HashTable result = (HashTable) super.clone();
		result.buckets = buckets.clone();
		return result;
	} catch (CloneNotSupportedException e) {
		throw new AssertionError();
	}
}

원본과 같은 연결 리스트를 참조함

개선
복잡한 가변 상태를 갖는 클래스용 재귀적 clone 메서드
Entry deepCopy() {
	return new Entry(key, value, next == null ? null : next.deepCopy());
}

@Override public HashTable clone() {
	try {
		HashTable result = (HashTable) super.clone();
		result.buckets = new Entry[buckets.length];
		for (int i = 0; i < buckets.length; i++) {
			if (buckets[i] != null) 
				result.buckets[i] = buckets[i].deepCopy();
		}
		return result;
	} catch (CloneNotSupportedException e) {
		throw new AssertionError();
	}
}
=> 연결 리스트 전체를 복사하기 위해 자신을 재귀적으로 호출
리스트의 원소 수만큼 스택 프레임을 소비하기 때문에 스택 오버 플로 일으킬 위험 있음

2 번째 개선

Entry deepCopy() {
	Entry result = new Entry(key, value, next);
	for (Entry p = result; p.next != null; p = p.next) {
		p.next = new Entry(p.next.key, p.next.value; p.next.next);
	}
	return result;
}
```

#effective-java 