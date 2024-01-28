**정적 팩토리 함수와 같다.**
``` kotlin
interface MyList<T> {
	companion object {
		fun <T> of(vararg elemetns: T): MyList<T>? {
			//...
		}
	}
}

다음과 같이 인터페이스에서도 구현할 수 있다.
```
### companion 객체 팩토리 함수에 사용되는 이름들
- **from**: 파라미터 하나 받고, 같은 타입의 인스턴스 하나를 리턴하는 타입 변환 함수를 나타낸다.
	- val date: Date = Date.from(instant)
- **of**: 파라미터를 여러 개 받고, 이를 통합해, 인스턴스를 만들어 주는 함수
	- val faceCards: Set\<Rank> = Enumset.of(JACK, QUEEN, KING)
- **valueOf**: from 또는 of와 비슷한 기능을 하면서도, 의미를 조금 더 쉽게 읽을 수 있게 이름을 붙인 함수
	- val prime: BigInteger = BigInteger.valueOf(Integer.MAX_VALUE)
- **instance** 또는 **getInstance**: 싱글턴으로 인스턴스 하나 리턴하는 함수
	- 아규먼트 기반으로 하는 인스턴스 리턴한다.
	- val luke: StackWalker = StackWalker.getInstance(options)
- **createInstance** 또는 **newInstance**: getInstance처럼 동작하지만 싱글턴이 적용되지 않아, 함수를 호출할 때마다 새로운 인스턴스를 만들어서 리턴
	- val newArray = Array.newInstance(classObject, arrayLen)
- **getType**: getInstance 처럼 동작하지만, 팩토리 함수가 다른 클래스에 있을 때 사용하는 함수 이름이다.
	- val fs: FileStore = Files.getFileStore(path)
- **newType**: newInstance처럼 동작하지만, 팩토리 함수가 다른 클래스에 있을 때 사용하는 이름
	- val br: BufferedReader = Files.newBufferedReader(path)

> [!info] companion object의 기능
> - 인터페이스를 구현할 수 있다
> - 클래스를 상속받을 수 있다.
> - 추상 companion 객체 팩토리는 값을 가질 수 있다. => 캐싱 구현, 테스트 위한 가짜 객체 생성을 할 수 있다.

``` kotlin
abstract class ActivityFactory {
	abstract ton getIntent(context: Context): Intent
	
	fun start(context: Context) {
		val intent = getIntent(context)
		context.startActivity(intent)
	}
	
	fun startForResult(activity: Activity, requestCode: Int) { 
		val intent = getIntent(activity)
		activity.startActivityforResult(intent, requestCode)
	}
}

class MainActivity : AppCompatActivity() {
	// ...
companion object: ActivityFactory() {
	override fun getIntent(context: Context): Intent = 
		Intent(context, MainActivity::class.java)
	}
}

// 사용
val intent = MainActivity·getIntent(context)
MainActivity.start(context)
MainActivity.startforResult(activity, requestCode)
```

#effective 