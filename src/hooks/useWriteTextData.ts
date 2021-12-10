export type IData = {
    id: number;
    category: string;
    title: string;
    date: string;
    img: string;
    content: string;
};

export const data = {
    id: 1,
    category: 'dev',
    title: 'Mock Data',
    date: '2021년 12월 11일 00:21',
    img: 'https://studiomeal.com/wp-content/uploads/2020/01/07-2.jpg',
    content: `
    CSS 레이아웃의 끝판왕이라고 할 수 있는 Grid(그리드) 튜토리얼에 잘 오셨습니다!
    앞서 공부한 Flex와 지금 공부할 Grid의 큰 차이점은

    Flex는 한 방향 레이아웃 시스템이고 (1차원)
    Grid는 두 방향(가로-세로) 레이아웃 시스템 (2차원)이라는 점입니다.

    따라서 Flex보다 더 복합적인 레이아웃 표현이 가능하지요.
    참고로 지금 보고 계신 이 1분코딩 웹사이트는 전체적인 레이아웃은 Grid로 잡았고, 부분 부분에 Flex와 Grid를 적절히 사용해 주었습니다.

    부모 요소인 div.container를 Grid Container(그리드 컨테이너)라고 부르고,
    자식 요소인 div.item들을 Grid Item(그리드 아이템)이라고 부릅니다.
    “컨테이너가 Grid의 영향을 받는 전체 공간이고, 설정된 속성에 따라 각각의 아이템들이 어떤 형태로 배치되는 것”이라고 생각하시면 됩니다.
    
    Flex와 마찬가지로, Grid는 컨테이너에 display: grid; 를 설정하는 것으로 시작합니다.
    `,
};
