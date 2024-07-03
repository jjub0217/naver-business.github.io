

/** 
 *  @로더표시
 * 
*/
const displayLoading = () => {
  console.log('로딩중');
  $(".indicator").addClass("display")
  setTimeout(()=> {
    $(".indicator").removeClass("display")
  },2000)
}


/** 
 *  @로더표시해제
 * 
*/
const hideLoading  = () => {
  console.log('로딩 끝');
  $(".indicator").removeClass("display")
}


/** 
 *  @애러표시
 * 
*/
const displayError  = () =>{
  console.log(error);
  console.log('에러발생');
  $(".error").addClass("display")
}


/** 
 *  @애러표시해제
 * 
*/
const hideError = () => {
  console.log('에러 초기화');
  $(".error").removeClass("display")
}


/** 
 *  @floating메뉴내부의swiper기능
 * 
*/
const menuSlide = new Swiper('.floating_menu .swiper',{
  slidesPerView:"auto",
  spaceBetween: 16,
  cssMode: true,
  breakpoints: {
    851: {
      spaceBetween: 48,
    },
  }
})


/** 
 *  @스크롤위치에따른floating메뉴나타내기
 * 
*/
$(window).scroll(function(){
  let curr = $(this).scrollTop()
  if(curr >= 1){
    $('.floating_menu').addClass('on')
  }else{
    $('.floating_menu').removeClass('on')
    }
  }
)

/** 
 *  @floating메뉴내부의슬라이드클릭기능
 * 
*/
$('.floating_menu .swiper-slide').click(function(){
  $(this).addClass('on').siblings().removeClass('on')
})






/** 
 * @onlineEducation섹션
 * 
 * 
*/
/** 
 * @onlineEducation섹션내부의swiper기능(클릭커블펄스했는데?)
 * 
*/
const onlineEducationSlide = new Swiper('.section_online_education .swiper',{
  slidesPerView:3,
  spaceBetween: 16,
  clickable: false,
  navigation: {
    nextEl: ".section_online_education .next",
    prevEl: ".section_online_education .prev",
  },
  on: {
    activeIndexChange: function(){
      $(".section_online_education .prev").addClass("on")
    }
  },
  breakpoints: {
    // 851 이상에만 적용
    851: {
      spaceBetween: 24,
    },
  }
})



/** 
 *  @onlineEducation섹션내용불러오는fetch함수
 * 
*/

const onlineEducationList = (tabId = "#online_ai") => {
  displayLoading();
  hideError();
  fetch("./data.json")
    .then((res) => res.json())
    .then((json) => {
      data = json.onlineEducation;
      let html1 = ``;
      let html1_2 = ``;

      sortData = data.filter((item) => {
        // item의 id 가 tabId 랑 같으면 1, 안 같으면 0
        return item.id.indexOf(tabId) >= 0;
      });
      sortData.forEach((item) => {
        item.contents.forEach((content) => {
          html1 += `<li class="swiper-slide"> 
          <a href="" class="link_slide">
            <span class="blind">링크</span>
          </a>
          <div class="slide">
            <div class="image_box">
              <img src=${content.imageUrl} alt="">
              <p class="save_text">
                나중에 볼 교육으로 저장 되었습니다.
              </p>
            </div>
            <div class="text_box">
              <strong>${content.textStrong}</strong>
              <div class="bottom">
                <ul class="tag_list">`;
          content.tags.forEach((tag) => {
            html1 += `<li class="tag">${tag}</li>`;
          });
          html1 += `</ul>
                <p class="desc">
                  ${content.desc}
                </p>
                <p class="short_desc">`;
          content.shortDesc.forEach((text) => {
            html1 += `<span>${text}</span>`;
          });
          html1 += `</p>
              </div>
            </div>
            <button class="bookmark" aria-label="북마크"></button>
          </div>
        </li>`;
        });
        html1_2 = `<li class="swiper-slide link_more">
         <a href="" class="link_slide">
          <span class="blind">링크</span>
         </a>
        <div class="slide">
          <p>
            <span>${item.course}</span> 코스교육<br>
            ${item.total}개 전체보기
          </p>
        </div>
      </li>`;
      });
      $(".section_online_education .swiper-wrapper").html(html1 + html1_2);
      hideLoading();
    })
    .catch((error) => {
      displayError(error);
    });
};

/** 
 *  @onlineEducation섹션내부의북마크기능
 * 
*/
$(document).on("click", ".bookmark",(function(){
  $(this).toggleClass("save")
  $(this).siblings(".image_box").addClass("on")
}))
/** 
 *  @onlineEducation섹션탭이동
 * 
*/
$('.section_online_education .tab_item').click(function(e){
  if(e.target.parentNode.id !== "all"){
    e.preventDefault();
  }
  onlineEducationList($(this).data("tab"))
  $(this).addClass('on').siblings().removeClass('on');
})



/** 
 *  @thisWeek섹션
 * 
*/
/** 
 *  @thisWeek섹션내부의PC버전swiper기능
 * 
*/
const thisWeekSlidePc = new Swiper('.section_this_week .swiper.pc',{
    slidesPerView: 4,
    spaceBetween: 24,
})
/** 
 *  @thisWeek섹션내부고정텍스트이동기능
 * 
*/
const anchor = (swipe)  => {
  const centerIndex = swipe.realIndex
  const section = swipe.el.parentNode.parentNode.className
  switch(centerIndex){
    case 0:
      $(`.${section} .text_box_mo#${section}-1`).addClass("on").siblings().removeClass("on")
      break;
    case 1:
      $(`.${section} .text_box_mo#${section}-2`).toggleClass("on").siblings().removeClass("on")
      break;
    case 2:
      $(`.${section} .text_box_mo#${section}-3`).toggleClass("on").siblings().removeClass("on")
      break;
    case 3:
      $(`.${section} .text_box_mo#${section}-4`).toggleClass("on").siblings().removeClass("on")
      break;
    default:
    return
  }
}
/** 
 *  @thisWeek섹션내부의모바일버전swiper기능
 * 
*/
const thisWeekSlideMo = new Swiper('.section_this_week .swiper.mo',{
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  spaceBetween: 16,
  initialSlide: 0,
  clickable: false,
  on: {
    transitionEnd: function(){
      anchor(this)
    }
  },
})


/** 
 *  @thisWeek섹션내용불러오는fetch함수(모바일버전fetch못함)
 * 
*/
const thisWeekList = () => {
  displayLoading()
  hideError()
  fetch('./data.json')
  .then(res => res.json())
  .then(json => {
    let data = json.thisWeek
    let htmlPc = ``
    data.forEach(element => {
      htmlPc += 
      `<li class="swiper-slide">
        <a href="" class="link_slide">
          <span class="blind">링크</span>
        </a>
        <div class="slide">
          <div class="image_box">
            <img src=${element.imageUrl} alt="">
              <p class="save_text">
                나중에 볼 교육으로 저장 되었습니다.
              </p>
          </div>
          <div class="text_box">
            <strong>${element.textStrong}
            </strong>
            <div class="bottom">
              <ul class="tag_list">`
                element.tags.forEach(tag => {
                htmlPc += 
                `<li class="tag">${tag}
                </li>`
                })
                htmlPc += 
              `</ul>
              <p class="desc">${element.desc}</p>
              <p class="short_desc">
                <span>${element.manager}</span>
                <span>${element.running}</span>
                <span>${element.total}개 강의</span>
              </p>
              </p>
            </div>
          </div>
          <button class="bookmark" aria-label="북마크"></button>
        </div>
      </li>`
    })
    $(".section_this_week .pc .swiper-wrapper").html(htmlPc);
    hideLoading()
  })
  .catch(error => {
    displayError(error)
  })
}




/** 
 *  @lineUp섹션
 * 
*/
/** 
 *  @lineUp섹션내부의swiper기능
 * 
*/
const lineUpSlide = new Swiper('.section_line_up .swiper',{
  slidesPerView: 3,
  spaceBetween: 16,
  clickable: false,
  breakpoints: {
    851: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
    navigation: {
    nextEl: ".section_line_up .next",
    prevEl: ".section_line_up .prev",
  },
  on: {
    activeIndexChange: function(){
      $(".section_line_up .prev").addClass("on")
    }
  }
})
/** 
 *  @lineUp섹션내용불러오는fetch함수
 * 
*/
const  lineUpList = () => {
  displayLoading()
  hideError()
  fetch('./data.json')
  .then(res => res.json())
  .then(json => {
    let data = json.lineUp
    let html = ``
    data.forEach(element => {
      html += 
      `<li class="swiper-slide">
        <a href="" class="link_slide">
          <span class="blind">링크</span>
        </a>
        <div class="slide">
          <div class="image_box">
            <img src=${element.imageUrl} alt="">
            <p class="save_text">
              나중에 볼 교육으로 저장 되었습니다.
            </p>
          </div>
          <div class="text_box">
            <strong>${element.textStrong}</strong>
            <p class="short_desc">
              <span>${element.manager}</span>
              <span>${element.running}</span>
              <span>${element.total}개 강의</span>
            </p>
            <button class="more_btn">더보기</button>
            <div class="more_area">`
              element.paragraph.forEach(content => {
                html +=
                `<div class="paragraph">
                  <p class="more_title">${content.title}</p>
                  <p class="more_content">
                  ${content.moreContent}
                  </p>
                </div>`
              })
              html +=
            `</div>
          </div>
          <button class="bookmark" aria-label="북마크"></button>
        </div>
      </li>`
    })
    $(".section_line_up .swiper-wrapper").html(html);
    hideLoading()
  })
  .catch(error => {
    displayError(error)
  })
} 

/** 
 *  @lineUp섹션내부더보기기능
 * 
*/
$(document).on("click",".more_btn",(function(){
  $(this).addClass('active').siblings().addClass('active')
}))

/** 
 *  @lineUp섹션내부툴팁기능
 * 
*/
$(".tooltip").click(function(){
  $(".tip").toggleClass('on')
})



/** 
 *  @newEducation섹션
 * 
*/
/** 
 *  @newEducation섹션내부의PC버전swiper기능
 * 
*/
const newEducationSlidePc = new Swiper('.section_new_education .swiper.pc',{
  slidesPerView: 4,
  spaceBetween: 24,
  clickable: false,
}) 
/** 
 *  @newEducation섹션내부의모바일버전swiper기능
 * 
*/
const newEducationSlideMo = new Swiper('.section_new_education .swiper.mo',{
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  spaceBetween: 16,
  initialSlide: 0,
  clickable: false,
  on:   {
    transitionEnd: function(){
      anchor(this)
    }
  } 
})  
/** 
 *  @newEducation섹션내용불러오는fetch함(모바일버전fetch못함)
 * 
*/
const newEducationList = () => {
  displayLoading()
  hideError()
  fetch('./data.json')
  .then(res => res.json())
  .then(json => {
    let data = json.newEducation
    let htmlPc = ``
    data.forEach(element => {
      htmlPc += 
      `<li class="swiper-slide">
        <a href="" class="link_slide">
          <span class="blind">링크</span>
        </a>
        <div class="slide">
          <div class="image_box">
            <img src=${element.imageUrl} alt="">
              <p class="save_text">
                나중에 볼 교육으로 저장 되었습니다.
              </p>
          </div>
          <div class="text_box">
            <strong>${element.textStrong}
            </strong>
            <div class="bottom">
              <ul class="tag_list">`
                element.tags.forEach(tag => {
                htmlPc += 
                `<li class="tag">${tag}
                </li>`
                })
                htmlPc += 
              `</ul>
              <p class="desc">
              ${element.desc}
              </p>
              <p class="short_desc">
                <span>${element.manager}</span>
                <span>${element.running}</span>
                <span>${element.total}개 강의</span>
              </p>
            </div>
          </div>
          <button class="bookmark" aria-label="북마크"></button>
        </div>
      </li>`
    })
    $(".section_new_education .pc .swiper-wrapper").html(htmlPc);
    hideLoading()
  })
  .catch(error => {
    displayError(error)
  })
}



/** 
 *  @notice섹션내용불러오는fetch함수
 * 
*/
const noticeList = () => {
  displayLoading()
  hideError()
  fetch('./data.json')
  .then(res => res.json())
  .then(json => {
    let data = json.notice
    let html = ``
    data.forEach(element => {
      html += 
      `<li class="notice_item">
          <a href="">
            <ul class="tag_list">`
              element.tags.forEach(tag => {
                html += 
                `<li class="tag">${tag}
                </li>`
                })
              html +=
              `</ul>
            <strong>${element.textStrong}</strong>
            <p class="date">${element.date}</p>
          </a>
        </li>`
    })
    $(".section_notice .notice_list").html(html);
    hideLoading()
  })
  .catch(error => {
    displayError(error)
  })
}




/** 
 *  @pc버전gnb서브리스트나타내는hover기능-
 * 
*/
//네이버비즈니스 gnb 벗어나는게 왜 범위가 좁을까?
$('.header > .inner .gnb').hover(function(e){
  $('.sub_list').addClass('on');
  $(".header").addClass("hov").height($('.sub_list').outerHeight(true)+$(".header .inner").height())
},function(e){
  $('.sub_list').removeClass('on');
  $(".header").css('height', 'auto')
  if($('.online_education_menu').length){
    $(".header").removeClass("hov")
  }
})


/** 
 *  @pc버전돋보기버튼클릭기능
 * 
*/
$(".search_btn").click(function(){
  $('.header').addClass("search")
  $(".search_area input").focus()
})


/** 
 *  @pc버전돋보기버튼닫기기능
 * 
*/
$(".close_button").click(function(){
  $('.header').removeClass("search")
})


/** 
 *  @모바일버전버거버튼클릭기능
 * 
*/
$(".burger_button").click(function(){
  $('body').toggleClass('scroll-hide');
  $(".mo_gnb_inner").toggleClass("isAct")
  $(".search_btn").toggleClass("mo_gnb-on")
  $(".burger_button").toggleClass("on")
  $(".header").toggleClass("mo_gnb-on")
  if ($(".burger_button").attr('aria-expanded') === 'false') {
    $('.burger_button').attr('aria-expanded', 'true' )
    $('.burger_button').attr('aria-selected', 'true' )
  } else {
    $('.burger_button').attr('aria-expanded', 'false' )
    $('.burger_button').attr('aria-selected', 'false' )
  }
})

/**
 * 
 * 
 */
$(".profile_image").hover(function(){
    $(this).attr('aria-haspopup', 'true' )
},function(){
 $(this).attr('aria-haspopup', 'false' )
})

/** 
 *  @모바일버전gnb에서top영역서브리스트나타나는기능
 * 
*/
$('.mo_gnb_inner .top .nav_item').click(function(e){
  $(this).find('.sub_list').toggleClass('on');
  $(this).find(".nav_item_title").toggleClass("on")
})


/** 
 *  @모바일버전gnb에서middle영역서브리스트나타나는기능
 * 
*/
$('.mo_gnb_inner .middle .nav_item').click(function(e){
  $(this).find('.sub_list').toggleClass('on')
  $(this).siblings().find('.sub_list').removeClass('on')
  $(this).find(".nav_item_title").toggleClass("on")
  $(this).siblings().find(".nav_item_title").removeClass("on")
})


/** 
 *  @관련사이트클릭기능
 * 
*/
$('.related').click(function (e){
  e.preventDefault()
  $(this).toggleClass('on')
})


/** 
 *  @footer의info영역클릭해서나타내는기능
 * 
*/
$('.info').click(function (e){
  e.preventDefault()
  $(this).toggleClass('on')
})

/** 
 *  @스크롤탑기능
 * 
*/
$(".scroll_top").click(function(){
  $('html, body').animate({scrollTop: 0}, 800);
  return false;
})

/** 
 *  @윈도우가로드되면json데이터fetch해오는함수들실행
 * 
*/
$(window).on("load",function(){
  onlineEducationList()
  thisWeekList()
  lineUpList()
  newEducationList()
  noticeList()
})