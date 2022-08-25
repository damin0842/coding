hljs.highlightAll();
        // 모달
        const modalBtn = document.querySelector(".modal__btn");
        const modalClose = document.querySelector(".modal__close");
        const modalCont = document.querySelector(".modal__cont");
       
        modalBtn.addEventListener("click", () => {
            modalCont.classList.add("show");
            modalCont.classList.remove("hide");

        });
        modalClose.addEventListener("click", () => {
            modalCont.classList.add("hide");
            modalCont.classList.remove("show");

        });

        //탭 메뉴
        const tabBtn = document.querySelectorAll(".modal__box .tabs > div");
        const tabCont = document.querySelectorAll(".modal__box .cont > div");

        tabBtn.forEach((element, index) => {
            // 버튼을 클릭함
            element.addEventListener("click", (event) => {

                //이벤트 정지함
                event.preventDefault();
                //클래스 active를 모두 제거함
                tabBtn.forEach(li => {
                    li.classList.remove("active");
                });
                //내가 클릭한 버튼에 active를 추가함
                element.classList.add("active");
                //버튼을 클릭하면 모든 자식 박스 숨김
                tabCont.forEach(div => {
                    div.style.display = "none";
                });
                //클릭한 버튼과 연결된 박스를 보이게 함
                tabCont[index].style.display = "block";
            });
        });