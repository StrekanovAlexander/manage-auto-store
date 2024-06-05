export default {
    date: (date) => date.toISOString().slice(0, 10),
    
    currentDate: () => new Date().toISOString().slice(0, 10),
    
    time: (date) => date.toLocaleTimeString('en-US'),
    
    equals: (val1, val2) => val1 === val2,
}