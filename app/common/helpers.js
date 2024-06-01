export default {
    date: (date) => { 
        return date.toLocaleDateString('RU', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        })
    },
    time: (date) => date.toLocaleTimeString('RU'),
    equals: (val1, val2) => val1 === val2,
    direct: (direction) => direction === 'in' ? 'Приход' : 'Расход'
}