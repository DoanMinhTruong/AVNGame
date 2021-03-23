const game = document.querySelector('.notice')
const board = document.querySelector('.board')
const close = document.getElementById('close')
const timer = document.querySelector('.timer')
const again = document.getElementById('again')
const start = document.getElementById('start')

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


close.addEventListener('click', function(){
    closeGame();
})
function closeGame(){
    game.style.display = 'none'
}
function CountDown(i,count,  callback) {
    callback = callback || function(){};
    var int = setInterval(function() {
        count.innerText = i;
        i-- || (clearInterval(int), callback());
    }, 1000);

}
var score = 0 ;

function startGame(){
    const count3 = document.querySelector('.count3')
    count3.style.display = 'block'
    closeGame();
    CountDown(2,count3 , function(){
        count3.style.display = 'none'
        count3.innerText = '3'
        board.style.display = 'block'
        
        for(let i = 0 ;i< 65; i++)
            Fall()
        CountDown(19, timer, function(){
            board.style.display = 'none';
            removeElementsByClass('item_fall')
            const result = document.createElement('div')
            result.className = 'result mx-3 row justify-content-center'
            if(score < 15){
                const result_content = document.createElement('div')
                result_content.className = 'p-3 col-md-6 col-xs-10 position-absolute bg-white text-center'
                result_content.innerHTML = `
                            <div class='h2 text-danger'>
                                RẤT TIẾC CHƯA VƯỢT QUA MINI GAME
                            </div>
                            <div class='result_title'>
                                Bạn đã thất bại mini game với số điểm <h2>`+score+ `/15</h2>  Hãy cố gắng lần sau!
                            </div>
                `
                
                // const result_title = document.createElement('div')
                // result_title.className = 'result_title'
                // result_title.innerText = 'RẤT TIẾC CHƯA VƯỢT QUA MINI GAME'
                // const result_content = document.createElement('div')
                // result_content.className = 'result_content'
                // result_content.innerHTML = 'Bạn đã thất bại mini game với số điểm <h2>'+score+'/15</h2>  Chúc bạn cố gắng lần sau!'
                const again = document.createElement('button')

                again.className = 'btn btn-info'
                again.id = 'again'
                again.innerText = 'Chơi lại'
                again.style.margin = '4%'

                const conti = document.createElement('button')
                conti.className = 'btn btn-warning'
                conti.id = 'conti'
                conti.innerText = 'Tiếp tục'
                conti.style.margin = '4%'

                // result.appendChild(result_title)
                // result.appendChild(result_content)
                result_content.appendChild(again)
                result_content.appendChild(conti)
            
            
                again.addEventListener('click' ,function(){
                    result.style.display= 'none'
                    startGame();
                })
                result.appendChild(result_content)

            }else{

                const result_content = document.createElement('div')
                result_content.className ='mx-3 p-3 col-md-6 col-xs-10 position-absolute bg-white text-center'
                result_content.innerHTML = `

                    <div class='h1 text-danger'>CHÚC MỪNG</div>
                    <div class='result_header'>
                    Bạn đã chiến thắng mini game với số điểm <h2>`+score+`/15</h2>  Phần thưởng cho bạn là mã giảm giá 20k dành cho đơn hàng trên 100k tại gian hàng chính hảng của Ajinomoto trên Tiki, Shopee, Lazada
                    </div>
                    <div class='voucher my-2 mx-5 py-2 bg-danger text-white h2 '>VR1208</div>
                    <div class='result_footer fw-bold'>Hãy lưu lại và mua sắm nhé!</div>

                `
                // const result_title = document.createElement('div')
                // result_title.className = 'result_title '
                // result_title.innerText = 'CHÚC MỪNG'
                // const result_content = document.createElement('div')
                // result_content.className = 'result_content'
                // result_content.innerHTML = 'Bạn đã chiến thắng mini game với số điểm <h2>'+score+'/15</h2>  Phần thưởng cho bạn là mã giảm giá 20k dành cho đơn hàng trên 100k tại gian hàng chính hảng của Ajinomoto trên Tiki, Shopee, Lazada'
                // const voucher = document.createElement('div')
                // voucher.className = 'voucher'
                // voucher.innerText = 'VR1208'
                // const result_footer = document.createElement('div')
                // result_footer.innerText = 'Hãy lưu lại mã và mua sắm nhé!'
                // result_footer.className = 'result_footer'
                const conti = document.createElement('button')
                conti.id = 'conti'
                conti.className = 'btn btn-primary'
                conti.innerText = 'Tiếp tục tham quan'
                conti.style.margin = '4%'

                // result.appendChild(result_title)
                // result.appendChild(result_content)
                // result.appendChild(voucher)
                // result.appendChild(result_footer)
                result_content.appendChild(conti)
                result.appendChild(result_content)
            }
                document.body.appendChild(result)

        })
    })
}

start.addEventListener('click' , function(e){
    startGame();
})
// 
const path = './resized/'
const products = []
for (let i = 0 ; i <= 76 ; i++)
    products.push(path  + i + '.png')
// 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function ItemFallDown(i , item , speed ){
    
    var int = setInterval(  function() {
        item.style.top = i + '%';
        i+=speed;
        if(i >= 85) {
            clearInterval(int)
            item.remove()
        } 

    }, 70);
}


//


async function Fall(){
    var rand_id = Math.floor(Math.random() * 76)
    var rand_left = Math.floor(Math.random() * 75) + 15
    var rand_speed = (Math.random() * 0.1) + 1   
    var wait = Math.random() * 50000 + 500 

    var item = document.createElement('img')
    item.loading = 'lazy'
    item.className = 'item_fall'
    item.src = products[rand_id]
    item.style.width = '70px'
    item.style.left = rand_left + '%';
    item.style.transition = 'all 0.6s'
    board.appendChild(item)

    item.draggable = 'true'
    item.addEventListener('dragstart' , function(){
        item.classList.add('invisible')
    })
    



    function drag(e){
        const cart = document.getElementById('cart_img')
        var x1 = cart.getBoundingClientRect().x
        var x2 = x1 + cart.getBoundingClientRect().width
        var y1 = cart.getBoundingClientRect().y
        var y2 = y1 + cart.getBoundingClientRect().width
        if(e.clientX >= x1-(item.x* (20/100)) && e.clientX <= x2+(item.x* (20/100))  && e.clientY >= y1-(item.y* (20/100)) && e.clientY <= y2+(item.y* (20/100))){
            e.preventDefault()
            item.remove();
            score++;
            
        }else{
            item.classList.remove('invisible')
        }
    }
    item.addEventListener('dragend' , function(e){
        drag(e);
    })
    
    item.addEventListener('touchstart',function(){
        item.classList.add('invisible')
    })
    item.addEventListener('touchend' , function(e){
        var el = e.changedTouches[0]
        const cart = document.getElementById('cart_img')
        var x1 = cart.getBoundingClientRect().x
        var x2 = x1 + cart.getBoundingClientRect().width
        var y1 = cart.getBoundingClientRect().y
        var y2 = y1 + cart.getBoundingClientRect().width
        if(el.clientX >= x1-(item.x* (20/100)) && el.clientX <= x2+(item.x* (20/100))  && el.clientY >= y1-(item.y* (20/100)) && el.clientY <= y2+(item.y* (20/100))){
            if(e.cancelable)
                e.preventDefault()
            item.remove();
            score++;
            
        }else{
            item.classList.remove('invisible')
        }
    })



    item.style.display = 'none'
    await sleep(wait)
    item.style.display = 'block'
    ItemFallDown(14, item, rand_speed)

}

