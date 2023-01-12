## 목차

[4장 디자인 패턴의 이해](#4장-디자인-패턴의-이해)
- [패턴이란?](#패턴이란)
- [디자인 패턴 구조](#디자인-패턴-구조)
- [4.2 GoF 디자인 패턴](#42-gof-디자인-패턴)
- [생성 패턴](#생성-패턴)
- [구조 패턴](#구조-패턴)
- [행위 패턴](#행위-패턴)

[5장 스트래티지 패턴](#5장-스트래티지-패턴)
- [문제점](#문제점)
- [해결책](#해결책)
    - [템플릿 콜백 패턴](#전략-패턴---템플릿-콜백-패턴)
    - [중복된 코드 개선](#중복된-코드-개선)

# 4장 디자인 패턴의 이해

### 패턴이란?
> 각 패턴은 우리 주변에서 자주 반복해서 발생하는 문제와 그 문제를 해결하는 핵심을 기술해 동일한 일을 두 번 다시 하지 않고 해결할 수 있도록 한다.

[돌아가기](#목차)

### 디자인 패턴 구조
- 콘텍스트: 문제가 발생하는 여러 상황 기술 => 패턴이 적용될 수 있는 상황 나타냄
    > 클래스가 객체를 생성하는 과정을 제어해야 하는 상황
- 문제: 패턴이 적용되어 해결될 필요가 있는 여러 디자인 이슈들을 기술 => 여러 제약 사항과 영향력도 문제 해결 위해 고려되야 함
    > 애플리케이션이 전역적으로 접근하고 관리할 필요가 있는 데이터 포함하고 동시에 이러한 데이터는 시스템에 유일하다. 어떤 방식으로 클래스에서 생성되는 객체의 수를 제어하고 클래스의 인터페이스에 접근하는 것을 제어해야 하는가?
- 해결: 문제 해결하도록 설계 구성하는 요소들과 그 요소들 사이의 관계, 책임, 협력 관계 기술
    해결은 반드시 구체적인 구현 방법이나 언어에 의존적이지 않으며 다양한 상황에 적용할 수 있는 일종의 템플릿
    > 클래스의 생성자를 public으로 정의하지 말고 private이나 protected로 선언해 외부에서 생성자를 이용해 객체를 일단 생성할 수 없게 만든다.

[돌아가기](#목차)

### 4.2 GoF 디자인 패턴

#### 생성 패턴
추상 팩토리, 빌더, 팩토리 메서드, 프로토타입, 싱글턴

> 객체의 생성과 조합을 캡슐화해 특정 객체가 생성되거나 변경되어도 프로그램 구조에 영향을 크게 받지 않도록 유연성 제공

#### 구조 패턴
어댑터, 브리지, 컴퍼지트, 데커레이터, 퍼사드, 플라이웨이트, 프록시

> 클래스나 객체 조합해 더 큰 구조 만드는 패턴 ex) 서로 다른 인터페이스를 지닌 2개의 객체를 묶어 단일 인터페이스를 제공하거나 객체들을 서로 묶어 새로운 기능 제공하는 패턴

#### 행위 패턴
책임연쇄, 커맨드, 인터프리터, 미디에이터, 메멘토, 옵서버, 스테이트, 스트래티지, 템플릿메서드, 비지터

> 한 객체가 혼자 수행할 수 없는 작업을 여러 개의 객체로 어떻게 분배하는지, 또 객체 사이의 결합도를 최소화하는 것에 중점을 둠


|패턴 분류|패턴 이름|패턴 설명|
|---|---|---|
|생성 패턴|추상 팩토리|구체적인 클래스에 의존하지 않고 서로 연관되거나 의존적인 객체들의 조합을 만드는 인터페이스 제공하는 패턴|
||팩토리 메서드|객체 생성 처리를 서브 클래스로 분리해 처리하도록 캡슐화 하는 패턴|
||싱글턴|전역 변수 사용하지 않고 객체 하나만 생성하도록 하며, 생성된 객체 어디에서든지 참조 할 수 있도록 하는 패턴 
|구조 패턴|컴퍼지트|여러개의 객체들로 구성된 복합 객체와 단일 객체를 클라이언트에서 구별 없이 다루게 하는 패턴
||데코레이터|객체의 결합을 통해 기능을 동적으로 유연하게 확장할 수 있게 해주는 패턴|
|행위 패턴|옵서버|한 객체의 상태 변화에 따라 다른 객체의 상태도 연동되도록 일대다 객체 의존 관계 구성하는 패턴|
||스테이트|객체의 상테에 따라 객체의 행위 내용 변경해주는 패턴|
||템플릿 메서드|어떤 작업 처리하는 일부분을 서브 클래스로 캡슐화해 전체 일을 수행하는 구조는 바꾸지 않으면서 특정 단계에서 수행하는 내역 바꾸는 패턴|
||커맨드|실행될 기능 캡슐화함으로써 주어진 여러 기능 실행할 수 있는 재사용성이 높은 클래스 설계하는 패턴|

[돌아가기](#목차)


# 5장 스트래티지 패턴

``` java
public abstract class Robot {
    private String name;

    public Robot(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void attack();
    public void move();
}

public class TaekwonV extends Robot {
    public TaekwonV(String name) {
        super(name);
    }

    public void attack() {
        System.out.println("attack");
    }

    public move() {
        System.out.println("walk");
    }
}

public class Atom extends Robot {
    public Atom(String name) {
        super(name);
    }

    public void atack() {
        System.out.println("atom attack");
    }

    public void move() {
        System.out.println("Atom fly");
    }
}

public class Client {
    public static void main(String[] args) {
        Robot taekwonV = new TaekwonV("TaekwonV");
        Robot atom = new Atom("Atom");

        System.out.println("My name is " + taekwonV.getName());
        taekwonV.move();
        taekwonV.attack();

        System.out.println();

        System.out.println("My name is " + atom.getName());
        atom.move();
        atom.attack();
    }
}
```
[돌아가기](#목차)

### 문제점 

- 기존 로봇의 공격 또는 이동 방법응ㄹ 수정하려면 어떤 변경 작업을 해야 하는가?
    ex) 아톰이 날 수는 없고 오직 걷게만 만들고 싶다면? 또는 태권V를 날게 하려면?
- 새로운 로봇을 만들어 기존의 공격 또는 이동 방법을 추가하거나 수정하려면? 
    ex) 새로운 로봇으로 지구의 용사 선가드 클래스를 만들어 태권V의 미사일 공격 기능을 추가하려면?

#### 기존 로봇의 공격과 이동 방법을 수정하는 경우

Atom 클래스의 move 메서드 수정

``` java
public class Atom extends Robot {
    public Atom(String name) {
        super(name);
    }

    public void atack() {
        System.out.println("atom walk");
    }

    public void move() {
        System.out.println("Atom fly");
    }
}
=> 새로운 기능으로 변경하려고 기존 코드의 내용을 수정하므로 OCP에 위배된다.
    Atom 클래스의 move 메서드와 TaekwonV 클래스의 move 메서드가 동일 기능을 하므로 기능이 중복되는 상황이 발생
    (중복 코드가 많게되면 나중에 로봇이 많이 추가가 되었을 때 모든 코드를 하나하나 수정해야 한다.)
```

#### 새로운 로봇에 공격/이동 방법을 추가/수정하는 경우

현재 설계에서는 로봇 자체가 캡슐화 단위 이므로 새로운 로봇을 로봇의 서브 클래스로 추가하기만 하면 된다.

> 로봇이 발전하여 새로운 방식의 이동 기능과 공격 기능은 계속해서 개발된다면 새로운 방식의 이동 기능과 공격 기능을 로봇에게 제공하기 위해선 기존 모든 코드를 수정해야 한다. => OCP 위배가 된다.

### 해결책

수정 코드

``` java
public abstract class Robot {
    private String name;
    private MovingStrategy movingStrategy;
    private AttackStrategy attackStrategy;

    public Robot(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void move() {
        movingStrategy.move();
    }

    public void attack() {
        attackStrategy.attack();
    }

    public void setMovingStrategy(MovingStrategy movingStrategy) {
        this.movingStrategy = movingStrategy;
    }

    public void setAttackStrategy(AttackStrategy attackStrategy) {
        this.attackStrategy = attackStrategy;
    }
}

public class Atom extends Robot {
    public Atom(String name) {
        super(name);
    }
}

public class TaeKwonV extends Robot {
    public TaeKwonV(String name) {
        super(name);
    }
}

interface MovingStrategy {
    public void move();
}

public class WalkingStrategy implements MovingStrategy {
    public void move() {
        System.out.println("I can only walk.");
    }
}

public class FlyingStrategy implements MovingStrategy {
    public void move() {
        System.out.println("I can fly.");
    }
}


interface AttackStrategy {
    public void attack();
}

public class MissileStrategy implements AttackStrategy {
    public void attack() {
        System.out.println("I have Missile and can attack with it.");
    }
}

public class PunchStrategy implements AttackStrategy {
    public void attack() {
        System.out.println("I have strong punch and can attack with it.");
    }
}

public class Client {
    public static void main(String[] args) {
        Robot taekwonV = new TaeKwonV("TaekwonV");
        Robot atom = new Atom("Atom");

        taekwonV.setMovingStrategy(new WalkingStrategy());
        taekwonV.setAttackStrategy(new MissileStrategy());

        atom.setMovingStrategy(new FlyingStrategy());
        atom.setAttackStrategy(new PunchStrategy());
    }
}
```

### 전략 패턴 -> 템플릿 콜백 패턴

``` java
public abstract class Robot {
    private String name;
    private MovingStrategy movingStrategy;
    private AttackStrategy attackStrategy;

    public Robot(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void move() {
        movingStrategy.move();
    }

    public void attack() {
        attackStrategy.attack();
    }

    public void setMovingStrategy(MovingStrategy movingStrategy) {
        this.movingStrategy = movingStrategy;
    }

    public void setAttackStrategy(AttackStrategy attackStrategy) {
        this.attackStrategy = attackStrategy;
    }
}

public class Atom extends Robot {
    public Atom(String name) {
        super(name);
    }
}

public class TaeKwonV extends Robot {
    public TaeKwonV(String name) {
        super(name);
    }
}

interface MovingStrategy {
    public void move();
}


interface AttackStrategy {
    public void attack();
}

public class Client {
    public static void main(String[] args) {
        Robot taekwonV = new TaeKwonV("TaekwonV");
        Robot atom = new Atom("Atom");

        taekwonV.setMovingStrategy(new MovingStrategy() {
            @Override
            public void move() {
                System.out.println("I can only walk.");
            }
        });
        taekwonV.setAttackStrategy(new AttackStrategy() {
            @Override
            public void attack() {
                System.out.println("I have Missile and can attack with it.");
            }
        });

        atom.setMovingStrategy(new MovingStrategy() {
            @Override
            public void move() {
                System.out.println("I can fly.");
            }
        });
        atom.setAttackStrategy(new AttackStrategy() {
            @Override
            public void attack() {
                System.out.println("I have strong punch and can attack with it.");
            }
        });
    }
}
```

### 중복된 코드 개선!

``` java
public abstract class Robot {
    private String name;
    private MovingStrategy movingStrategy;
    private AttackStrategy attackStrategy;

    public Robot(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void move(String moveType) {
        executeMove(moveType).move();
    }

    public void attack(String attackType) {
        executeAttack(attackType).attack();
    }

    public MovingStrategy executeMove(final String moveType) {
        return new MovingStrategy() {
            @Override
            public void move() {
                System.out.println(moveType);
            }
        }
    }

    public AttackStrategy executeAttack(final String attackType) {
        return new AttackStrategy() {
            @Override
            public void attack() {
                System.out.println(attackType);
            }
        }
    }
    
}

public class Atom extends Robot {
    public Atom(String name) {
        super(name);
    }
}

public class TaeKwonV extends Robot {
    public TaeKwonV(String name) {
        super(name);
    }
}

interface MovingStrategy {
    public void move();
}


interface AttackStrategy {
    public void attack();
}

public class Client {
    public static void main(String[] args) {
        Robot taekwonV = new TaeKwonV("TaekwonV");
        Robot atom = new Atom("Atom");

        taekwonV.move("I can walk.");
        taekwonV.attack("I have sword");

        atom.move("I can fly.");
        atom.attack("I shot Missile");
    }
}
```
[돌아가기](#목차)

# 6장 싱글턴 패턴

``` java

public class Printer {
    private static Printer printer = null;
    private Printer() {}

    public static Printer getPrinter() {
        if (printer == null) {
            printer = new Printer();
        }
        return printer;
    }
}

=> 동기화 문제 발생
```

### 해결책
- 정적 변수에 인스턴스를 만들어 바로 초기화 하는 방법

``` java
public class Printer {
    private static Printer printer = new Printer();
    private int counter = 0;
    private Printer() {}

    public static Printer getPrinter() {
        return printer;
    }

    public void print(String str) {
        counter++;
        System.out.println(str);
    }
}
```
   
- 인스턴스를 만드는 메서드에 동기화 하는 방법
``` java
public class Printer {
    private static Printer printer = null;
    private Printer() {}

    public synchronized static Printer getPrinter() {
        if (printer == null) {
            printer = new Printer();
        }
        return printer;
    }

    public void print(String str) {
        counter++
        System.out.println(str);
    }
}
=> 다중 쓰레드가 하나뿐인 counter 변수 값에 동시에 갱신하기 때문에 카운팅 안됨

public void print(String str) {
    synchronized(this) {
        counter++;
        System.out.println(str + counter)
    }
}
```

