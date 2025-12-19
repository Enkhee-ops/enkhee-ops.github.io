
const MONGOLIAN_ALPHABET = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 
    'Н', 'О', 'Ө', 'П', 'Р', 'С', 'Т', 'У', 'Ү', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 
    'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
];


const QUESTION_CATEGORIES = {
    animals: [
        { 
            question: "Хамгийн том хөхтөн амьтан?", 
            answer: "БАЛАН",
            hint: "Усанд амьдардаг том биетэй амьтан"
        },
        { 
            question: "Африкт амьдардаг аварга амьтан?", 
            answer: "АРАВТА",
            hint: "Том биетэй, урт хүзүүтэй амьтан"
        },
        { 
            question: "Шаргал өнгөтэй, махчин амьтан?", 
            answer: "ИРВЭС",
            hint: "Ойд амьдардаг, мах идэштэн"
        },
        { 
            question: "Монголд өргөн тархсан малын нэг төрөл?", 
            answer: "ХОНЬ",
            hint: "Ноос их өгдөг мал"
        },
        { 
            question: "Хамгийн хурдан гүйдэг амьтан?", 
            answer: "ИВЭЭРЧ",
            hint: "Африкт амьдардаг, маш хурдан гүйдэг"
        }
    ],
    vehicles: [
        { 
            question: "Хамгийн хурдан тээврийн хэрэгсэл?", 
            answer: "НИСЭХОНГОЦ",
            hint: "Агаараар нисдэг том тээврийн хэрэгсэл"
        },
        { 
            question: "Дэлхийн хамгийн том онгоц?", 
            answer: "АНТОНОВ",
            hint: "Оросын үйлдвэрлэдэг ачааны онгоц"
        },
        { 
            question: "Хоёр дугуйтай тээврийн хэрэгсэл?", 
            answer: "ДУГУЙ",
            hint: "Дугуйтай, моторгүй тээврийн хэрэгсэл"
        },
        { 
            question: "Төмөр зам дээр явдаг тээврийн хэрэгсэл?", 
            answer: "ГАЛТТЭРЭГ",
            hint: "Төмөр замаар явдаг, олон вагонтой"
        },
        { 
            question: "Далайд явдаг том тээврийн хэрэгсэл?", 
            answer: "ХОЁЛ",
            hint: "Усанд хөвж явдаг том тээврийн хэрэгсэл"
        }
    ],
    geography: [
        { 
            question: "Монгол улсын нийслэл?", 
            answer: "УЛААНБААТАР",
            hint: "Туул голын эрэг дээрх хот"
        },
        { 
            question: "Дэлхийн хамгийн том тив?", 
            answer: "АЗИ",
            hint: "Хятад, Энэтхэг зэрэг улсууд оршдог тив"
        },
        { 
            question: "Дэлхийн хамгийн өндөр уул?", 
            answer: "ЖОМОЛУНГМА",
            hint: "Гималайн нуруунд орших дэлхийн дээвэр"
        },
        { 
            question: "Монгол улсын хамгийн урт гол?", 
            answer: "СЭЛЭНГЭ",
            hint: "Байгал нуур цутгадаг гол"
        },
        { 
            question: "Дэлхийн хамгийн том цөл?", 
            answer: "САХАРЫН",
            hint: "Африкт орших элсэн цөл"
        }
    ],
    general: [
        { 
            question: "Компьютерийн таних тэмдэг?", 
            answer: "ПАРОЛЬ",
            hint: "Нууц үг"
        },
        { 
            question: "Хүний оюун ухааны хөгжлийн түвшин?", 
            answer: "ИКЮ",
            hint: "Оюуны чадварын үзүүлэлт"
        },
        { 
            question: "Дэлхийн хамгийн олон хэлээр ярьдаг хэл?", 
            answer: "АНГЛИ",
            hint: "Олон улсын харилцааны хэл"
        },
        { 
            question: "Цахилгаан хөдөлгүүртэй хоёр дугуй?", 
            answer: "МОТОЦИКЛЬ",
            hint: "Дугуйтай, хурдан явдаг тээврийн хэрэгсэл"
        },
        { 
            question: "Монгол улсын үндэсний мөнгөний нэгж?", 
            answer: "ТӨГРӨГ",
            hint: "Монголын валют"
        }
    ]
};


const DIFFICULTY_LEVELS = {
    1: { basePoints: 100, timeBonus: 50, lifeBonus: 20, wordLength: 3 },
    2: { basePoints: 150, timeBonus: 75, lifeBonus: 25, wordLength: 4 },
    3: { basePoints: 200, timeBonus: 100, lifeBonus: 30, wordLength: 5 },
    4: { basePoints: 250, timeBonus: 125, lifeBonus: 35, wordLength: 6 },
    5: { basePoints: 300, timeBonus: 150, lifeBonus: 40, wordLength: 7 },
    6: { basePoints: 350, timeBonus: 175, lifeBonus: 45, wordLength: 8 },
    7: { basePoints: 400, timeBonus: 200, lifeBonus: 50, wordLength: 9 },
    8: { basePoints: 450, timeBonus: 225, lifeBonus: 55, wordLength: 10 },
    9: { basePoints: 500, timeBonus: 250, lifeBonus: 60, wordLength: 11 },
    10: { basePoints: 550, timeBonus: 275, lifeBonus: 65, wordLength: 12 }
};


function getDifficultyConfig(level) {
    if (level <= 10) {
        return DIFFICULTY_LEVELS[level];
    } else {
        return {
            basePoints: 550 + (level - 10) * 50,
            timeBonus: 275 + (level - 10) * 25,
            lifeBonus: 65 + (level - 10) * 5,
            wordLength: Math.min(12 + Math.floor((level - 10) / 2), 20)
        };
    }
}


const POWER_UPS = {
    reveal: {
        name: "Үсэг илрүүлэх",
        description: "Нэг санамсаргүй үсгийг илрүүлнэ",
        cost: 50,
        icon: "fa-eye"
    },
    life: {
        name: "Нэмэлт амь",
        description: "Нэг амийг нэмнэ",
        cost: 100,
        icon: "fa-heart"
    },
    freeze: {
        name: "Цаг зогсоох",
        description: "Цагийг 10 секунд зогсооно",
        cost: 75,
        icon: "fa-snowflake"
    },
    double: {
        name: "Давхар оноо",
        description: "Дараагийн зөв таамаглалд 2 дахин их оноо өгнө",
        cost: 150,
        icon: "fa-star"
    },
    skip: {
        name: "Үг алгасах",
        description: "Одоогийн үгийг алгасна",
        cost: 200,
        icon: "fa-forward"
    }
};




const GAME_MODES = {
    standard: {
        name: "Энгийн горим",
        description: "Ганц шат тоглох",
        hasTimer: false,
        isInfinite: false
    },
    infinite: {
        name: "Төгсгөлгүй горим",
        description: "Амь дуустал тоглох",
        hasTimer: false,
        isInfinite: true
    },
    timed: {
        name: "Цагтай горим",
        description: "Хугацааны дотор аль болох олон шат давах",
        hasTimer: true,
        isInfinite: false,
        timeLimit: 180 
    }
};


window.GAME_DATA = {
    MONGOLIAN_ALPHABET,
    QUESTION_CATEGORIES,
    DIFFICULTY_LEVELS,
    getDifficultyConfig,
    POWER_UPS,
    GAME_MODES
};