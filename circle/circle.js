$(function(){
    let timer;
    const colors=["red","blue","pink","teal","magenta","gold","green","skyblue","purple","yellow"];

    //add container class to container
    $('#container').addClass('container');

    //start button
    $('#start').on('click', start);
    
    function drawCircle(index){
        //get length
        const size = $('#width').val();

        //get random color
        const color = colors[Math.round(Math.random(0,1) * 10)]; //colors[index % 10];

        let mtop = 'auto';
        let left = 'auto';

        //make dynamic offset based on windows height/width
        let height = window.innerHeight;
        let width = window.innerWidth;

        if(height > 820){
            height = height - (height - 830);
            width = width - (width - 1730);
        } else {
            height = height - (height - 830) - height/6;
            width = width - (width - 1730) - width/4;
        }

        if(index % 4 === 0){
            left = width/2 - (6 * index) + 30 + 'px'; //850
        }
        else if (index % 4 === 1){
            left = width/2 + (6 * index) - 30 + 'px';
        }
        else if (index % 4 === 2){
            mtop = height/2 - (6 * index) + 20 + 'px'; //350
        }
        else{
            mtop = height/2 + (6 * index) - 20 + 'px';
        }

        //create new circle
        const newElement = $('<div>', {"id" : "circle", "class": "circle", "css": {
                                                                            'min-height': size + 'px',
                                                                            'min-width': size + 'px',
                                                                            'background-color' : color,
                                                                            'top': mtop,
                                                                            'left': left,
                                        }})
                                        .on("click", clickHandler)
                                        .on('mousemove', mousemoveHandler)
                                        // .on('mouseover', mouseoverHandler)
                                        .on('mouseout', mouseoutHandler);

        return newElement;

    }

    function start(){

        //get total number of circles to draw
        const total = parseInt($('#total').val());
        let elements = [];
        for(let i = 0; i<total; i++){
            elements.push(drawCircle(i));
        }

        //add circle to container
        $('#container').append(elements);

        //get interval to grow
        const rate = $('#rate').val();

        //make circle grow
        timer = setInterval(() => {
            //get growth size by
            const growth = parseInt($('#amount').val());
            const size = parseInt($('div').find('.circle').css('height'));

            $('div').find('.circle')
                    .css({
                        'min-height': size + growth + 'px',
                        'min-width': size + growth + 'px',
                    });
        }, rate);
    }


    //event handler for circle click
    function clickHandler(){
        $(this).hide();
    }

    //mousemove event handler
    function mousemoveHandler(e){
        //total width of circle
        const size = parseInt($('#width').val());
        let opac = 1;

        if(e.offsetX > 0 )
            opac = 1 - e.offsetX / size;

        $(this).css('opacity', opac);
    }

    // //mouseover event handler
    // function mouseoverHandler(e){
    //     //total width of circle
    //     const size = parseInt($('#width').val());
    
    //    timer = setInterval(() => {
    //                     let opac = parseInt($(this).css('opacity'));
    //                     opac = opac < 0.2 ? opac : opac - 0.1;
    //                     $(this).css('opacity', opac);
    //             }, 250)
    // }

    //mouseout event habdler
    function mouseoutHandler(){
        //clearInterval(timer);
        $(this).css('opacity',1);
     }

})
