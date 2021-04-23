const upButton = document.querySelector('.up-btn'),
    downButton = document.querySelector('.down-btn'),
    postsList  = document.querySelector('.posts-list')

let flag

async function  getInfo () {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "GET"
    })
    let posts = await data.json()
    for (let post of posts) {
        let li = document.createElement('li')
        let h1 = document.createElement('h1')
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let p = document.createElement('p')

        li.classList.add('post')

        span1.innerText = post.id + '.'
        span2.innerText = post.title
        p.innerText = post.body

        h1.appendChild(span1)
        h1.appendChild(span2)
        li.appendChild(h1)
        li.appendChild(p)
        postsList.appendChild(li)
    }
    
    let lists = document.querySelectorAll('li')
    slideVertically(lists)
}
getInfo()


function slideVertically (lists) {
    flag = 0
    lists[0].classList.add('previous-post')
    lists[1].classList.add('current-post')
    lists[2].classList.add('next-post')
    nextButton.onclick = () => {
        if (flag == 0) {
            lists[0].style = `
                transform: translate(-50%, -50%) translateY(0) scale(1.2);
                z-index: 99;
            `
            lists[1].style = `
                transform: translate(-50%, -50%) translateY(100px) scale(1);
                z-index: 9;
            `
            lists[2].style = `
                transform: translate(-50%, -50%) translateY(-100px) scale(1);
                z-index: 9;
            `
            flag = 1
        } else if (flag == 1) {
            lists[0].style = `
                transform: translate(-50%, -50%) translateY(100px) scale(1);
                z-index: 9;   
            `
            lists[1].style = `
                transform: translate(-50%, -50%) translateY(-100px) scale(1);
                z-index: 9;
            `
            lists[2].style = `
                transform: translate(-50%, -50%) translateY(0) scale(1.2);
                z-index: 99; 
            `
            flag = 2
        } else if (flag == 2) {
            lists[0].style = `
                transform: translate(-50%, -50%) translateY(-100px) scale(1);
                z-index: 9;   
            `
            lists[1].style = `
                transform: translate(-50%, -50%) translateY(0) scale(1.2);
                z-index: 99;
            `
            lists[2].style = `
                transform: translate(-50%, -50%) translateY(100px) scale(1);
                z-index: 9; 
            `
            flag = 0
        }
    }
}