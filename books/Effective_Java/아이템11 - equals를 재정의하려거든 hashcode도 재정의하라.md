## 전형적인 hashCode 메서드
``` java
@Override
public int hashCode() {
	int result = Short.hashCode(areaCode);
	result = 31 * result + Short.hashCode(prefix);
	result = 31 * result + Short.hashCode(lineNum);
	return result;
}
```

## 한 줄짜리 hashCode메서드 - 성능이 아쉬움
``` java
@Override
public int hashCode() {
	return Objects.hash(lineNum, prefix, areaCode);
}

성능이 느린 이유
입력 인수를 잠기 위한 배열이 만들어지고
입력 중 기본 타입이 있다면 박싱과 언박싱도 거쳐야 하기 때문.
```

#effective-java 