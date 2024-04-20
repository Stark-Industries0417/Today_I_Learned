``` kotlin
val fullName: String?  
    get() = name?.let { "$it $surname" }  
val fullName2: String? = name?.let { "$it $surname" }

위는 다음과 같이 컴파일 된다.

private static final String fullName2;

public static final String getFullName() {  
   String var10000 = name;  
   if (var10000 != null) {  
      String var0 = var10000;  
      int var2 = false;  
      var10000 = var0 + ' ' + surname;  
   } else {  
      var10000 = null;  
   }  
  
   return var10000;  
}
```

> [!info]
> custom getter를 사용한 경우 프로퍼티에 접근할 때 커스텀 게터를 사용해서 접근하게 된다.
> custom getter를 사용하지 않은 경우 프로퍼티에 할당 된 그 자체의 값을 사용해서 접근한다.
> 그저 프로퍼티에 초기화를 해놓으면 프로퍼티 값을 그저 사용한다.

#kotlin 