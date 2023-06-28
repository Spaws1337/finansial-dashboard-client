import {dashboard, expenses, trend} from '../utils/icons'

export const menuItems = [
    {
        id: 1,
        title: 'Главная',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Доходы",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Расходы",
        icon: expenses,
        link: "/dashboard",
    },
]