import { useEffect, useState } from "react"

//Создаем кастомный хук useFullScreen
export const useFullScreen = () =>{
    //Определяем размер окна
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])
    //При каждом изменение размера окна вызываем функцию updateSize которая будет обновлять значения size
    useEffect(()=> {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)
        //Удаляем обработчик событий чтобы избежать утечки памяти и ненужные вызовы функции
        return () => window.removeEventListener('resize', updateSize)
    },[])
    //Возвращаем обьект со значениями ширины и высоты окна браузера
    return {
        width: size[0],
        height: size[1]
    }
}