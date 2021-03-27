const game = document.querySelector('.notice')
const board = document.querySelector('.board')
const close = document.getElementById('close')
const timer = document.querySelector('.timer')
const again = document.getElementById('again')
const start = document.getElementById('start')
const last_score = document.querySelector('.score')
function SoundWin(){
    const Win = new Audio('./sounds/wow.mp3')
    Win.play();
}
function SoundLose(){
    const Lose = new Audio('./sounds/lose.mp3')
    Lose.play();
}
function SoundCart(){
    const Cart = new Audio('./sounds/bounce.mp3')
    Cart.play();
}
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
        (i--) || (clearInterval(int), callback());
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
        for(let i = 0 ;i< 70; i++)
            Fall()
        CountDown(19, timer, function(){
            board.style.display = 'none';
            removeElementsByClass('item_fall')
            const result = document.createElement('div')
            result.className = 'result mt-5 mx-3 row justify-content-center'
            if(score < 15){
                const result_content = document.createElement('div')
                result_content.className = 'result-child p-3 col-md-6 col-xs-10 position-absolute bg-white text-center'
                result_content.innerHTML = `
                            <div class='h2 text-danger'>
                                RẤT TIẾC CHƯA VƯỢT QUA MINI GAME
                            </div>
                            <div class='result_title h4'>
                                Bạn đã thất bại mini game với số điểm <h2>`+score+ `/15</h2>  Hãy cố gắng lần sau!
                            </div>
                `
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
                result_content.appendChild(again)
                result_content.appendChild(conti)
                SoundLose();
                again.addEventListener('click' ,function(){
                    score = 0;
                    last_score.innerText = '0'
                    timer.innerText = '20'
                    result.style.display= 'none'
                    var allcart = document.querySelectorAll('.cart_image')
                    allcart.forEach(e => {
                        e.remove()
                    });
                    startGame();
                })
                result.appendChild(result_content)
            }else{
                const result_content = document.createElement('div')
                result_content.className ='result-child mx-3 p-3 col-md-6 col-xs-10 position-absolute bg-white text-center'
                result_content.innerHTML = `
                    <div class='h1 text-danger'>CHÚC MỪNG</div>
                    <div class='result_header'>
                    Bạn đã chiến thắng mini game với số điểm <h2>`+score+`/15</h2>  Phần thưởng cho bạn là mã giảm giá 20k dành cho đơn hàng trên 100k tại gian hàng chính hảng của Ajinomoto trên Tiki, Shopee, Lazada
                    </div>
                    <div class='voucher my-2 mx-5 py-2 bg-danger text-white h2 '>VR1208</div>
                    <div class='result_footer h4 fw-bold'>Hãy lưu lại và mua sắm nhé!</div>
                `
                const conti = document.createElement('button')
                conti.id = 'conti'
                conti.className = 'btn btn-primary'
                conti.innerText = 'Tiếp tục tham quan'
                conti.style.margin = '4%'
                result_content.appendChild(conti)
                result.appendChild(result_content)
                SoundWin();
            }
                document.body.appendChild(result)
        })
    })
}
start.addEventListener('click' , function(e){
    startGame();
})
const path = './resized/'
const products = []
for (let i = 0 ; i <= 76 ; i++)
    products.push(path  + i + '.png')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function Fall(){
    var rand_id = Math.floor(Math.random() * 76)
    var rand_left = Math.floor(Math.random() * 50) + 25
    var rand_speed = (Math.random() * 10) + 5   
    var wait = Math.random() * 50000 + 500 
    var item = document.createElement('img')
    item.loading = 'lazy'
    item.className = 'item_fall'
    item.src = products[rand_id]
    item.style.left = rand_left + '%';
    item.style.transition = 'all 0.5s';
    board.appendChild(item)
    item.style.display = 'none'
    await sleep(wait)
    item.style.display = 'block'
    var auto
    function ItemFallDown(i , item , speed ){
            auto = setInterval(  function() {
            item.style.top = i + 'px';
            i+=speed;
            var hei = document.documentElement.clientHeight
            if(i >= hei - (hei * 1 /100)) {
                clearInterval(auto)
                item.remove()
            } 
        }, 70);
    }
    ItemFallDown( 0, item, rand_speed)
    var int
    var mousePosition;
    var offset = [0,0];
    var isDown = false;
    var isMove = false
    item.addEventListener('mousedown', function(e) {
        clearInterval(auto);
        isDown = true;
        offset = [
            item.offsetLeft - e.clientX,
            item.offsetTop - e.clientY
        ];
    } , false);
    item.addEventListener('mousemove', function(event) {
        if (isDown) {
            item.style.transition = ''
            isMove = true;
            event.preventDefault()
            clearInterval(int)
            mousePosition = {
                x : event.clientX,
                y : event.clientY
            };
            item.style.left = (mousePosition.x + offset[0]) + 'px';
            item.style.top  = (mousePosition.y + offset[1]) + 'px';
            drag(event)
            item.style.transition = 'all 0.5s'  
        }
    },false);
    board.addEventListener('mouseup', function(e) {
        if(isMove){
            isDown = false;
            function ItemFallDown(i , item , speed ){
                int = setInterval(  function() {
                    item.style.top = i + 'px';
                    i+=speed;
                    var hei = document.documentElement.clientHeight
                    if(i >= hei - (hei *  1/100)) {
                        clearInterval(int)
                        item.remove()
                    } 
                }, 50);
            }
            ItemFallDown( mousePosition.y + offset[1], item, rand_speed)
        }
        isMove = false;
    },false);
    const allCart = document.getElementById('cart')
    function ChongAnh(){
        var t_img = document.createElement('img')
        t_img.src = item.src 
        t_img.className = 'cart_image'
        var r_img = Math.floor(Math.random() * 45) - 45
        t_img.style.transform = 'rotate(' + r_img + 'deg)';
        allCart.appendChild(t_img)
    }
    function drag(e){
        const cart = document.getElementById('cart_img')
        var x1 = cart.getBoundingClientRect().x
        var x2 = x1 + cart.getBoundingClientRect().width
        var y1 = cart.getBoundingClientRect().y
        var y2 = y1 + cart.getBoundingClientRect().width
        if(e.clientX >= x1-(item.x* (5/100)) && e.clientX <= x2+(item.x* (5/100))  && e.clientY >= y1-(item.y* (5/100)) && e.clientY <= y2+(item.y* (5/100))){
            e.preventDefault()
            item.remove();
            ChongAnh()
            SoundCart();
            score++;
            last_score.innerText = score;
        }
    }
    
    




















    var int2 
    var mousePosition2;
    var offset2 = [0,0];
    var isDown2 = false;
    var isMove2 = false


    item.addEventListener('touchstart', function(e) {
        clearInterval(auto);
        isDown2 = true

        ItemFallDown(item.style.top , item, rand_speed)

    } , false);
    function ItemFallDown(i , item , speed ){
        int2 = setInterval(  function() {
            item.style.top = i + 'px';
            i+=speed;
            var hei = document.documentElement.clientHeight
            if(i >= hei - (hei *  1/100)) {
                clearInterval(int2)
                item.remove()
            } 

        }, 50);
    }
    item.addEventListener('touchmove',function(e){
            console.log('touch move')
            if(isDown2){
                e.preventDefault()
                clearInterval(int2);
                isMove2 = true
                mousePosition2 = {
                    x : e.changedTouches[0].clientX,
                    y : e.changedTouches[0].clientY
                };
                item.style.transition = ''
                item.style.left = mousePosition2.x   + 'px';
                item.style.top = mousePosition2.y   +'px';
                
            }
            isDown2 = false
        })

    



    item.addEventListener('touchend' , function(e){
        if(isDown2){
            var el = e.changedTouches[0]
                const cart = document.getElementById('cart_img')
                var x1 = cart.getBoundingClientRect().x
                var x2 = x1 + cart.getBoundingClientRect().width
                var y1 = cart.getBoundingClientRect().y
                var y2 = y1 + cart.getBoundingClientRect().width
                if(e.cancelable)
                        e.preventDefault()
                if(el.clientX >= x1-(item.x* (5/100)) && el.clientX <= x2+(item.x* (5/100))  && el.clientY >= y1-(item.y* (5/100)) && el.clientY <= y2+(item.y* (5/100))){
                    item.remove();
                    ChongAnh()
                    SoundCart();
                    score++;
                    last_score.innerText = score;
                    
                }
            if(isMove2){
                item.style.transition = 'all 0.5s'

                
                ItemFallDown( mousePosition2.y + offset2[1], item, rand_speed)
            }
            isMove2 = false;
        }

    })



    


        


    // function ItemFallDown(i , item , speed ){
    //     var int = setInterval(  function() {
    //         item.style.top = i + 'px';
    //         i+=speed;
    //         var hei = document.documentElement.clientHeight
    //         if(i >= hei - (hei * 25 /100)) {
    //             clearInterval(int)
    //             item.remove()
    //         } 
    
    //     }, 70);
    // }
    // ItemFallDown(0 , item, rand_speed)
}

