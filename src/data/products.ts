export interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
}

export const PRODUCTS: Product[] = [
    { 
        id: '1', 
        name: 'Pop! Anduin Wrynn', 
        price: 14.99, 
        image: require('../assets/images/pop-anduin.png'),
    },
    { 
        id: '2', 
        name: 'Pop! Illidan Stormrage', 
        price: 14.99, 
        image: require('../assets/images/pop-illidan.png'),
    },
    { 
        id: '3', 
        name: 'Pop! Jaina Proudmoore', 
        price: 14.99, 
        image: require('../assets/images/pop-jaina.png'),
    },
    { 
        id: '4', 
        name: 'Pop! Xalatath', 
        price: 14.99, 
        image: require('../assets/images/pop-xalatath.png'),
    },
    { 
        id: '5', 
        name: 'Pop! Aleria Windrunner', 
        price: 14.99, 
        image: require('../assets/images/pop-aleria.png'),
    },
    { 
        id: '6', 
        name: 'Pop! Thrall', 
        price: 14.99, 
        image: require('../assets/images/pop-thrall.png'),
    },
    { 
        id: '7', 
        name: 'Pop! Sylvanas Windrunner', 
        price: 29.99, 
        image: require('../assets/images/pop-sylvanas.png'),
    },
    { 
        id: '8', 
        name: 'Pop! The Lich King', 
        price: 54.99, 
        image: require('../assets/images/pop-lichking.png'),
    },
];