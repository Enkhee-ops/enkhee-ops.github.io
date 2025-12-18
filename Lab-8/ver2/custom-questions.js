// Custom Questions Database - Add your questions here!
const CUSTOM_QUESTIONS = {
  animals: [
    { question: "Хамгийн том хөхтөн амьтан?", answer: "ХАЛИМ", hint: "Далайд амьдардаг аварга биетэй" },
    { question: "Монголын үндэсний амьтан?", answer: "МОРЬ", hint: "Нүүдэлчдийн үнэнч хүлэг" },
    { question: "Шаргал өнгөтэй махчин амьтан?", answer: "ЧОНО", hint: "Бүлгээрээ ан авдаг" },
    { question: "Цөлийн ус хадгалдаг амьтан?", answer: "ТЭМЭЭ", hint: "Бөхтэй" },
    { question: "Ойд амьдардаг том махчин?", answer: "БААВГАЙ", hint: "Өвөл ичдэг" },
    { question: "Хурдан гүйдэг амьтан?", answer: "ХАРЦАГА", hint: "Шувуу" },
    { question: "Монголд элбэг мал?", answer: "ХОНЬ", hint: "Ноостой" },
    { question: "Урт чихтэй амьтан?", answer: "ТУУЛАЙ", hint: "Ой, талд амьдарна" },
    { question: "Шөнийн махчин шувуу?", answer: "ШАРШУУ", hint: "Харанхуйд хардаг" },
    { question: "Хамгийн урт хүзүүтэй амьтан?", answer: "Анаш", hint: "Африкт амьдардаг" },

    { question: "Усанд амьдардаг хөхтөн?", answer: "ДАЛАЙНГҮРВЭЛ", hint: "Сэлдэг" },
    { question: "Ойн жижиг мэрэгч?", answer: "ХУЛГАНА", hint: "Жижиг, хурдан" },
    { question: "Махчин муур төрлийн амьтан?", answer: "БАР", hint: "Судалтай" },
    { question: "Шувуудын хаан?", answer: "БҮРГЭД", hint: "Тэнгэрт өндөр ниснэ" },
    { question: "Өндөг гаргадаг тэжээвэр шувуу?", answer: "ТАХИА", hint: "Гэрийн тэжээмэл" },
    { question: "Усанд амьдардаг аварга амьтан?", answer: "АКУЛ", hint: "Махчин загас" },
    { question: "Монгол малын нэг?", answer: "ЯМАА", hint: "Сахалтай" },
    { question: "Ойд авирч явдаг амьтан?", answer: "САРМАГЧИН", hint: "Модонд амьдарна" },
    { question: "Өвсөн тэжээлтэн том амьтан?", answer: "ЗААН", hint: "Хошуутай" },
    { question: "Уснаас нисэж чаддаг шувуу?", answer: "НУГАС", hint: "Сэлдэг" },

    { question: "Арьс нь цэгтэй муур?", answer: "ИРВЭС", hint: "Ууланд амьдарна" },
    { question: "Өндөрт нисдэг шувуу?", answer: "ТОРГОТ", hint: "Жижиг биетэй" },
    { question: "Хурдан гүйдэг муур?", answer: "ГЕПАРД", hint: "Африкийн тал" },
    { question: "Гэрийн тэжээвэр хамгаалагч?", answer: "НОХОЙ", hint: "Харуул хийдэг" },
    { question: "Сэрвээтэй хөхтөн?", answer: "ДАЛАЙНАРСЛАН", hint: "Далайд амьдарна" }
  ],

  vehicles: [
    { question: "Хоёр дугуйтай тээврийн хэрэгсэл?", answer: "ДУГУЙ", hint: "Хөлөөр хөдөлгөнө" },
    { question: "Агаараар нисдэг тээврийн хэрэгсэл?", answer: "ОНГОЦ", hint: "Нисдэг" },
    { question: "Төмөр зам дээр явдаг?", answer: "ГАЛТТЭРЭГ", hint: "Вагонтой" },
    { question: "Цэргийн хуягт машин?", answer: "ТАНК", hint: "Гинжтэй" },
    { question: "Далайд явдаг тээврийн хэрэгсэл?", answer: "ХӨЛӨГОНГОЦ", hint: "Усанд явна" },

    { question: "Хувийн автомашин?", answer: "МАШИН", hint: "4 дугуйтай" },
    { question: "Нийтийн тээвэр?", answer: "АВТОБУС", hint: "Олон хүн суудалтай" },
    { question: "Ачаа тээвэрлэдэг машин?", answer: "АЧААНЫМАШИН", hint: "Том кузовтой" },
    { question: "Цахилгаан тээврийн хэрэгсэл?", answer: "СКҮТЕР", hint: "Цэнэглэдэг" },
    { question: "Хот дотор хурдан явдаг?", answer: "МОТОЦИКЛ", hint: "Мото" },

    { question: "Усанд шумбаж явдаг?", answer: "ШУМБАГЧОНГОЦ", hint: "Далайн доор" },
    { question: "Зам цэвэрлэдэг машин?", answer: "ЦАСНЫМАШИН", hint: "Өвөл ашиглана" },
    { question: "Агаарын цэргийн тээвэр?", answer: "СӨНӨӨГЧОНГОЦ", hint: "Цэргийн" },
    { question: "Төмөр замын жижиг тэрэг?", answer: "ДРЕЗИН", hint: "Засварын" },
    { question: "Ой мод тайрах машин?", answer: "ТРАКТОР", hint: "Хөдөө аж ахуй" },

    { question: "Такси?", answer: "ТАКСИ", hint: "Такси" },
    { question: "Уулын тээврийн хэрэгсэл?", answer: "КАНАТ", hint: "Дүүжин" },
    { question: "Спортын машин?", answer: "БОЛИД", hint: "Хурдтай" },
    { question: "Галт тэрэгний толгой?", answer: "ЛОКОМОТИВ", hint: "Чирдэг" },
    { question: "Дугуйтай усан тээвэр?", answer: "УСАНМОТОЦИКЛ", hint: "Амралт" },

    { question: "Хот дотор ганцаараа унадаг?", answer: "СКҮТЕР", hint: "Жижиг" },
    { question: "Агаарын бөмбөлөг?", answer: "АЭРОСТАТ", hint: "Хийтэй" },
    { question: "Замын ажилд ашигладаг?", answer: "АСФАЛЬТДУГУЙ", hint: "Нягтруулна" },
    { question: "Төмөр замын буудал?", answer: "ВАГОН", hint: "Суудалтай" },
    { question: "Уул уурхайн машин?", answer: "БУЛЬДОЗЕР", hint: "Газар шороо" }
  ],

  geography: [
    { question: "Монгол улсын нийслэл?", answer: "УЛААНБААТАР", hint: "Туул голын эрэгт" },
    { question: "Дэлхийн хамгийн том тив?", answer: "АЗИ", hint: "Хамгийн олон хүн амтай" },
    { question: "Дэлхийн хамгийн өндөр уул?", answer: "ЭВЕРЕСТ", hint: "Гималайд" },
    { question: "Дэлхийн хамгийн том цөл?", answer: "САХАР", hint: "Африкт" },
    { question: "Монголын хамгийн том нуур?", answer: "УВС", hint: "Баруун аймагт" },

    { question: "Дэлхийн хамгийн урт гол?", answer: "НИЛ", hint: "Африкт" },
    { question: "Европын хамгийн том улс?", answer: "ОРOС", hint: "Хоёр тивд оршдог" },
    { question: "Монголын хамгийн өндөр уул?", answer: "ХҮЙТЭН", hint: "Алтайд" },
    { question: "Номхон далайн өөр нэр?", answer: "PACIFIC", hint: "Тайван" },
    { question: "Азийн баруун захын тэнгис?", answer: "КАСПИЙ", hint: "Нуур мэт" },

    { question: "Монголын өмнөд хөрш?", answer: "ХЯТАД", hint: "Их хана" },
    { question: "Монголын хойд хөрш?", answer: "ОРОС", hint: "Сибирь" },
    { question: "Хамгийн хүйтэн тив?", answer: "АНТАРКТИД", hint: "Мөстэй" },
    { question: "Европ тивийн төв?", answer: "ГЕРМАН", hint: "Холбооны улс" },
    { question: "Дэлхийн хамгийн их хүн амтай улс?", answer: "ЭНЭТХЭГ", hint: "Ази" },

    { question: "Монголын баруун аймаг?", answer: "БАЯНӨЛГИЙ", hint: "Казахуудтай" },
    { question: "Дэлхийн хамгийн том арал?", answer: "ГРЕНЛАНД", hint: "Мөстэй" },
    { question: "Улаанбаатарын гол?", answer: "ТУУЛ", hint: "Хот дайрч урсана" },
    { question: "Японы нийслэл?", answer: "ТОКИО", hint: "Их хот" },
    { question: "Францын нийслэл?", answer: "ПАРИС", hint: "Эйфелийн цамхаг" },

    { question: "Африкийн хамгийн өмнөд улс?", answer: "ӨМНӨДАФРИК", hint: "Хоёр далайтай" },
    { question: "Америкийн нийслэл?", answer: "ВАШИНГТОН", hint: "DC" },
    { question: "Австралийн нийслэл?", answer: "КАНБЕРРА", hint: "Сидней биш" },
    { question: "Италийн нийслэл?", answer: "РОМ", hint: "Эртний хот" },
    { question: "Дэлхийн хамгийн их далай?", answer: "НОМХОН", hint: "Pacific" }
  ],

  general: [
    { question: "Компьютерийн нууц үг?", answer: "НУУЦҮГ", hint: "Нэвтрэхэд ашиглана" },
    { question: "Монгол үндэсний мөнгөн тэмдэгт?", answer: "ТӨГРӨГ", hint: "₮" },
    { question: "Оюуны чадварын үзүүлэлт?", answer: "IQ", hint: "Ухаан" },
    { question: "Интернетийн хаяг?", answer: "URL", hint: "Вэб" },
    { question: "Электрон шуудангийн тэмдэг?", answer: "АТ", hint: "@ тэмдэг" },

    { question: "Компьютерийн тархи?", answer: "CPU", hint: "Процессор" },
    { question: "Мэдээлэл хадгалах төхөөрөмж?", answer: "ХАРДДИСК", hint: "Storage" },
    { question: "Гар утасны үйлдлийн систем?", answer: "ANDROID", hint: "Google" },
    { question: "Компьютер асаах үйлдэл?", answer: "BOOT", hint: "Эхлүүлэх" },
    { question: "Зураг боловсруулах програм?", answer: "PHOTOSHOP", hint: "Adobe" },

    { question: "Вэб хуудасны хэл?", answer: "HTML", hint: "Markup" },
    { question: "Загварын хэл?", answer: "CSS", hint: "Style" },
    { question: "Вэб програмчлалын хэл?", answer: "JAVASCRIPT", hint: "Logic" },
    { question: "Мэдээллийн сан?", answer: "DATABASE", hint: "Өгөгдөл" },
    { question: "Програмын алдаа?", answer: "BUG", hint: "Алдаа" },

    { question: "Файл хадгалах үйлдэл?", answer: "SAVE", hint: "Ctrl+S" },
    { question: "Хуулбарлах?", answer: "COPY", hint: "Ctrl+C" },
    { question: "Буулгах?", answer: "DOWNLOAD", hint: "Интернет" },
    { question: "Файл устгах?", answer: "DELETE", hint: "Remove" },
    { question: "Нууцлал хамгаалалт?", answer: "SECURITY", hint: "Аюулгүй байдал" },

    { question: "Компьютерийн дэлгэц?", answer: "MONITOR", hint: "Display" },
    { question: "Мэдээлэл оруулах төхөөрөмж?", answer: "KEYBOARD", hint: "Гар" },
    { question: "Хулгана?", answer: "MOUSE", hint: "Заагч" },
    { question: "Интернэт хөтөч?", answer: "BROWSER", hint: "Chrome" },
    { question: "Програм суулгах?", answer: "INSTALL", hint: "Setup" }
  ]
};

// Function to get random question from category
function getRandomQuestion(category) {
    const questions = CUSTOM_QUESTIONS[category] || CUSTOM_QUESTIONS.animals;
    if (questions.length === 0) {
        return { question: "Асуулт байхгүй", answer: "ТЕСТ", hint: "Туршилтын үг" };
    }
    return questions[Math.floor(Math.random() * questions.length)];
}

// Export for use
window.CustomQuestions = {
    CUSTOM_QUESTIONS,
    getRandomQuestion
};