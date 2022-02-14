const fruits = [
    {id: 1, title: 'яблоки', price: 20, img:'https://domstrousam.ru/wp-content/uploads/2021/02/yabloko_gorchit.jpg'},
    {id: 2, title: 'апельсины', price: 30, img:'https://proprikol.ru/wp-content/uploads/2019/10/kartinki-apelsina-8.jpg'},
    {id: 3, title: 'манго', price: 40, img:'https://severdv.ru/wp-content/uploads/2019/11/mango-foto-ploda.jpg'}
]

const modal = modalWindow({
    title:'Kamil modal',
    closable: true,
    content: `
    <h4>Modal is working</h4>
    <p>lorem ipsim dolor sit</p>`,
    width: '400px',
    footerButtons: [
        {text:'Ok', type: 'primary', handler() {
            console.log('Primary btn clicked');
            modal.close()
        }},
        {text:'Cancel', type: 'danger', handler() {
            console.log('Danger btn clicked');
            modal.close()
        }}
    ]
})

