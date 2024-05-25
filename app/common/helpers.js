export default {
    date: (date) => { 
        return date.toLocaleDateString('RU', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        })
    },
    time: (date) => date.toLocaleTimeString('RU'),
}