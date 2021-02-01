# 라이브 채팅 API

## 방 Room

라이브 스트리밍을 하는 공간.

- roomId: string
- title: string // 방 제목
- description: string // 방 설명 // 공지사항으로 쓰일 것도 같음
- image: string // 섬네일 이미지
- isIdle: boolean // 방송중인지 여부
- streamingMode: string // Video | Audio // 나중에
- isChattable: boolean // 해당 방에서의 채팅금지 여부
- timeout: int // nuable // 채팅금지 끝나는 시각
- streamId: Kakao Connect Live 스트리밍용 방 아이디
- tagList: Tag[] // 태그(role, genre, mood) 리스트

  - tagId // 태그 아이디
  - displayName // 태그 이름

- spokenLanguage // 미래에 쓰일 것 같은 스펙 // 현시점에서는 필요 없을듯
- bannedWordList: string[] // 금지어 리스트 // 클라이언트에서 필터링할 용도

## 채팅 Chatting

- message: string // 채팅 내용
- isRemoved: boolean // 해당 채팅 삭제 여부 // validCheck로 바뀌어야 하는지는 모르겠음
- createdAt: string // ISO8601
- author // nullable // ref. 시청자

  - authorId
  - role
  - displayName
  - image

- style

  - text // 채팅 내용 스타일링

    - textColor: string
    - backgroundColor: string

  - label // 관리자 등 라벨 스타일링

    - textColor: string
    - backgroundColor: string

  - displayName // 이름 스타일링

    - textColor: string
    - backgroundColor: string

## 시청자 Attendee

- userId: string
- role: string // Normal | Artist | Manager // 처음에는 Normal | Artist만 있을듯
- displayName: string // 유저 이름
- image: string // 유저 프로필 이미지
- isFollowing: boolean // 팔로 여부
- isFavorited: boolean // 좋아요 여부
- isChattable: boolean // 해당 방에서의 채팅금지 여부
- timeout: int // nullable // 채팅금지 끝나는 시각

## 신청곡 Request Work

추후에는 `신청곡 플레이리스트` 가 필요할지도 모름.

- workId: string
- title: string // 신청곡 제목
- artistName: string // 신청곡 아티스트
- enableDonation: boolean // 도네이션 가능 여부

## 도네이션 Donation

### 기본 도네이션 Basic Donation

image, message 둘 중 하나는 있어야 함.
image가 있으면 선물 도네이션.
message가 있으면 팬레터 도네이션.

- donationId: string
- coinAmount: int
- image: string // nullable
- message: string // nullable
- author // ref. 시청자

  - authorId
  - role
  - displayName
  - image

### 신청곡 후원 Request Work Donation

- workId: string
- coinAmount: int // 코인 개수
- image: string
- author // ref. 사용자

  - authorId
  - role
  - displayName
  - image

# 예상 필요 API

경로는 예시용 경로임.

## 방 리스트 (GET /rooms)

- 제목
- 섬네일 이미지
- 시청자 수
- 좋아요 수

## 방 정보 (GET /rooms/:roomId)

- 제목
- 설명
- 섬네일 이미지
- 방송중 여부
- 스트리밍 모드 // 나중에 추가해도 될듯
- 채팅금지 여부
- 채팅금지 끝나는 시각
- 스트림 아이디
- 시청자 수
- 좋아요 수
- 신청곡 리스트

  - 작품 아이디
  - 작품 이름
  - 도네이션 가능 여부
  - 총 기프트 개수 (카운트 기준은 서버 사정에 따라...)

## 방 정보 변경 (PUT /rooms/:roomId)

- 제목, 설명, 섬네일 이미지 등

## 방송 시작 (POST /self/streaming/start)

- isIdle이 false로 바뀌어야 함

## 방송 종료 (POST /self/streaming/end)

- isIdle이 false로 바뀌어야 함

## 시청자로서의 본인 정보 (GET /self)

- 역할(Normal | Artist | Manager)
- 이름
- 이미지
- 팔로 여부
- 좋아요 여부
- 채팅금지 여부
- 방 참여금지 여부

## 신청곡 추가 (POST /rooms/:roomId/reqeust-works)

## 신청곡 삭제 (DELETE /rooms/:roomId/request-works)

## 신청곡 변경 (PUT /rooms/:roomId/request-works)

- 도네이션 가능 여부

## 금지어 추가 (POST /rooms/:roomId/banned-words)

## 금지어 삭제 (DELETE /rooms/:roomId/banned-words)
