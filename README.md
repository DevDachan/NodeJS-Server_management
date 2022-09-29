# Server_management

- 여러개의 Server가 있다고 가정 했을 때 해당 Server들의 상태를 한번에 확인하고 관리할 수 있는 Web Service이다. 



## 1. Server
1) Web Service
- Web Service는 기본적으로 NodeJS 프레임워크를 통해 생성했다.
### Main
![image](https://user-images.githubusercontent.com/111109411/193001568-3662069f-1dca-42a6-8eaa-29cca8506223.png)

* Main화면에서는 기본적으로 각각의 Server의 Data를 Block형식으로 나타내주고 현재 CPU사용량을 Circle Progress bar를 통해 나타냈다.
해당 Server의 Block을 클릭 할 경우 각각의 Server의 History를 확인 할 수 있고 Menu에 있는 Add Server를 통해 새로운 Server를 추가할 수 있다.

### Add Server
![image](https://user-images.githubusercontent.com/111109411/193002161-813cf3b9-23e7-4b12-973f-6c28611bc2c6.png)

- 각각의 Server는 특정 Key value를 부여받게 되며 해당 Key value를 통해서 Client program이 Server Program에게 Data를 보내게 된다.
Key value는 Random하게 생성이되고 모두 고유한 값을 가지게 된다.
- Server의 이름은 자유롭게 지정이 가능하다.

![image](https://user-images.githubusercontent.com/111109411/193002554-534c3ae2-8967-4b9b-90c9-0a7931c98183.png)
- 생성이 완료된 Server는 위와 같이 생성이 되고 아직 Client Program이 한번도 Data를 보낸적이 없다면 Empty를 나타내게 된다.
만약 Server가 Data를 보낸 History가 존재하지만 상태가 Off되어 있을 경우에는 아래와 같이 빨간 배경에 OFF를 나타낸다.

![image](https://user-images.githubusercontent.com/111109411/193002851-e846483c-5826-4f63-af70-6fc8cf2102f1.png)




2) Python script




## 2. Client
1) Python script
