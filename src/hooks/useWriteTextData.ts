export interface IWriteData {
    id: number;
    category: string;
    title: string;
    date: string;
    img: string;
    content: string;
}

export type IDataContainer = {
    posts: Array<IWriteData>;
};

export const data = {
    posts: [
        {
            id: 1,
            category: 'dev',
            title: 'Mock Data Grid',
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
        },
        {
            id: 2,
            category: 'jounal',
            title: 'Mock Data Item',
            date: '2021년 12월 11일 02:16',
            img: 'https://cms-assets.tutsplus.com/uploads/users/30/posts/33545/preview_image/tailwind-pre.png',
            content: `
            현재 프론트엔드에는 정말 많은 CSS 프레임워크가 있죠.
            전 Bootstrap, PureCSS, BulmaCSS 정도를 써 봤는데, 모두 훌륭하지만 디자인을 커스터마이징을 할때 불편함이 남는다는 것이 약간 아쉬웠더랬습니다.
                    
            그런데 Tailwind CSS를 썼을 때는 그런 부분에 대한 아쉬움이 전혀 없었습니다. 정말 편했죠.
                    
            다만 한글 자료가 살짝 부족하다는 느낌이 들었고, 그래서 Tailwind CSS의 기초적인 사용에 대해서 정리해보고자 합니다.
                    
            소개
            기존의 CSS 프레임워크들은 대부분 미리 정해진 디자인의 component들이 있고, 그 컴포넌트들을 가져다 사용하는 방식이었습니다. 정해진 디자인을 구성할 때는 빠르고 효율적입니다. 하지만 개발자가 원하는 형태의 디자인을 적용할 때는 많은 애로사항이 꽃피게 됩니다.
                    
            Tailwind는 컴포넌트 위주의 디자인 대신 HTML 문서에 저수준의 유틸리티 클래스를 정의하는 것으로 디자인을 구성할 수 있습니다. 물론 부트스트랩같이 기존 디자인을 빠르게 가져와서 구성할 수는 없겠지만, 커스터마이징이 아주 편하고, 직관적이기 때문에 CSS를 직접 다루는 것을 선호하는 개발자에게 좋은 선택지로 생각됩니다.
            `,
        },
    ],
};
