# board-project

<설치 및 설정법>

mysql 설치 (Mac m1 기준)

- 로컬 설치: 
brew install mysql 명령어로 mysql 설치 후,

username: root
password: root

자세한 설치 방법은 해당 링크를 참조해주세요. https://truecode-95.tistory.com/182

--------------------------------------------------------

- docker를 이용해 mysql container 띄우는 방법:

docker 설치

docker --platform linux/amd64 pull mysql

docker run --name mysql --platform linux/amd64 -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql

docker start mysql

docker exec -it mysql bash

mysql -uroot -proot

터미널 종료

--------------------------------------------------------

<서버 실행>
github 주소: https://github.com/bglehun/board-project.git

모듈 의존성 설치: npm i -y --save

서버 실행: npm run start 

* 별도로 셋팅해야할 환경변수는 없습니다.
* 서버 실행 시, "local" Database와 Table이 자동 생성되게 만들어놨습니다.

--------------------------------------------------------

<구현 및 작성 목록>
* Swagger 주소: http://localhost:4001/docs/

* API 테스트는 Swagger Execute를 사용하시면 됩니다.

- DB 스키마 생성 스크립트 (혹시라도 생성 안될 경우를 대비하여 생성 SQL 작성):
=> CREATE DATABASE IF NOT EXISTS local;

- 게시글 목록 API
- 게시글 작성 API
- 게시글 수정 API
- 게시글 삭제 API

- 댓글 목록 API
- 댓글 작성 API

