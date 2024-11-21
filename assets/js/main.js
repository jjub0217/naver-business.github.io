/**
 * @로더
 */
const indicator = document.querySelector(".indicator");
const errored = document.querySelector(".error")

const displayLoading = () => {
  indicator.classList.add("display")
}

const hideLoading  = () => {
  indicator.classList.remove("display");
}

const displayError  = () =>{
  errored.classList.add("display")
}

const hideError = () => {
  errored.classList.remove("display")
}


/**
 * @scrollTop
 */
const scrollTop = document.querySelector(".scroll_top");

scrollTop.onclick = (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};


/**
 * @floatingMenu
 */
const menuSlide = new Swiper(".floating_menu .swiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  cssMode: true,
  breakpoints: {
    851: {
      spaceBetween: 48,
    },
  },
});

const floatingItems = document.querySelectorAll(".floating_menu .swiper-slide");

const floatingMenu = document.querySelector(".floating_menu");

floatingItems.forEach((floatingItem) => {
  floatingItem.onclick = (e) => {
    e.preventDefault();
    [...floatingItems].filter((item) => {
      if (item === e.target.parentNode) {
        e.target.parentNode.classList.add("is_active");
      } else {
        item.classList.remove("is_active");
      }
    });
  };
});

window.addEventListener("scroll", function () {
  let curr = this.scrollY;
  if (curr >= 1) {
    floatingMenu.classList.add("is_active");
  } else {
    floatingMenu.classList.remove("is_active");
  }
});


/**
 * @tabList
 */
const tabItems = document.querySelectorAll(
  ".section_online_education .tab_item"
);

tabItems.forEach((tabItem) => {
  tabItem.onclick = (e) => {
    onlineEducationList(e.target.parentNode.dataset.tab);
    [...tabItems].forEach((item) => {
      const button = item.querySelector(".tab_item_title");
      if (item === e.target.parentNode) {
        e.target.setAttribute("aria-selected", "true");
      } else {
        button.setAttribute("aria-selected", "false");
      }
    });
  };
});


/**
 * @swiper_anchor swipe 
 * @fetch 
 */

const anchor = (swipe) => {
  const centerIndex = swipe.realIndex;
  const section = swipe.el.parentNode.parentNode.className;
  const textBoxes = document.querySelectorAll(`.${section} .text_box_mo`);
  
  switch (centerIndex) {
    case 0:
      textBoxes.forEach((textBox) => {
        if (textBox.id.includes("1")) {
          textBox.classList.add("is_active");
        } else {
          textBox.classList.remove("is_active");
        }
      });
      break;
    case 1:
      textBoxes.forEach((textBox) => {
        if (textBox.id.includes("2")) {
          textBox.classList.add("is_active");
        } else {
          textBox.classList.remove("is_active");
        }
      });
      break;
    case 2:
      textBoxes.forEach((textBox) => {
        if (textBox.id.includes("3")) {
          textBox.classList.add("is_active");
        } else {
          textBox.classList.remove("is_active");
        }
      });
      break;
    case 3:
      textBoxes.forEach((textBox) => {
        if (textBox.id.includes("4")) {
          textBox.classList.add("is_active");
        } else {
          textBox.classList.remove("is_active");
        }
      });
      break;
    default:
      return;
  }
};


const handleAsyncProcess = async (asyncFunction, ...args) => {
  try {
    displayLoading(); 
    hideError(); 
    await asyncFunction(...args); 
  } catch (error) {
    displayError(error); 
  } finally {
    hideLoading(); 
  }
};

function bookmarkCheck(){

}

const onlineEducationList = async (tabId = "#online_ai") => {
  const commonA11ySettings = {
    enabled: true,
    containerMessage: "프로모션 슬라이드 영역입니다.",
    slideLabelMessage:
      "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    firstSlideMessage: "첫번째 슬라이드입니다.",
    lastSlideMessage: "마지막 슬라이드입니다.",
    paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
    containerRoleDescriptionMessage: "Carousel",
    itemRoleDescriptionMessage: "Slide",
    slideRole: "listitem",
  };

  const res = await fetch("./data.json");
  const json = await res.json();
  data = json.onlineEducation;
  let html1 = ``;
  let html1_2 = ``;

  sortData = data.filter((item) => {
    return item.id.indexOf(tabId) >= 0;
  });
  sortData.forEach((item_1) => {
    item_1.contents.forEach((element, index) => {
    const uniqueId = `online_${index}_${Math.random()
      .toString(36)
      .slice(2, 11)}`;
      html1 += `<li class="swiper-slide"> 
        <div class="image_box">
          <img src="${element.imageUrl}" alt="${element.textStrong}">
          <div class="bookmark_box">
          <input type="checkbox" data-id="${uniqueId}" class="bookmark" checked="false" name="online_bookmark">
          <label data-id="${uniqueId}" aria-label="북마크"></label>
          <p class="save_message">
            나중에 볼 교육으로 저장 되었습니다.
          </p>
          </div>
        </div>
        <div class="text_box">
          <strong class="content_title">${element.textStrong}</strong>
          <div class="content">
            <ul class="tag_list">`;
      element.tags.forEach((tag) => {
        html1 += `<li class="tag">${tag}</li>`;
      });
      html1 += `</ul>
            <p class="description">
              ${element.desc}
            </p>
            <ul class="course_summary">`;
      element.shortDesc.forEach((text) => {
        html1 += `<li class="detail_item">${text}</li>`;
      });
      html1 += `</ul>
          </div>
        </div>
        <a href="" class="link_slide">
          <span class="blind">링크</span>
        </a>
      </li>`;
    });
    html1_2 = `<li class="swiper-slide link_more">
      <a href="" class="link_slide">
      <span class="blind">링크</span>
      </a>
      <div class="slide">
        <span class="course_title">${item_1.course}</span> 
        코스교육<br>
        ${item_1.total}개 전체보기
      </div>
    </li>`;
  });

  document.querySelector(
    ".section_online_education .swiper-wrapper"
  ).innerHTML = html1 + html1_2;

  new Swiper(".section_online_education .swiper", {
    a11y: commonA11ySettings,
    spaceBetween: 16,
    slidesPerView: 1,
    navigation: {
      nextEl: ".section_online_education .next_button",
      prevEl: ".section_online_education .prev_button",
    },
    on: {
      activeIndexChange: function () {
        document
          .querySelector(".section_online_education .prev_button")
          .classList.add("is_show");
      },
    },
    breakpoints: {
      850: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });

  document.querySelectorAll("label[data-id]").forEach((label) => {
    const dataId = label.getAttribute("data-id");
    const input = document.querySelector(`input[data-id="${dataId}"]`);
    if (input) {
      label.setAttribute("for", (input.id = dataId));
    }
  });

  const bookmark = document.querySelectorAll(
    ".section_online_education .bookmark"
  );

  bookmark.forEach(check => {
    check.onchange = (e) => {
      if (e.target.checked === false) {
        e.target.parentNode.classList.add("is_checked");
      } else {
        e.target.parentNode.classList.remove("is_checked");
      }
    };
  })
};

const thisWeekList = async () => {
  const commonA11ySettings = {
    enabled: true,
    containerMessage: "프로모션 슬라이드 영역입니다.",
    slideLabelMessage:
      "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    firstSlideMessage: "첫번째 슬라이드입니다.",
    lastSlideMessage: "마지막 슬라이드입니다.",
    paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
    containerRoleDescriptionMessage: "Carousel",
    itemRoleDescriptionMessage: "Slide",
    slideRole: "listitem",
  };

  const res = await fetch("./data.json");
  const json = await res.json();
  let data = json.thisWeek;
  let html = ``;
  data.forEach((element, index) => {
    const uniqueId = `this_week_${index}_${Math.random()
      .toString(36)
      .slice(2, 11)}`; 
    html += `<li class="swiper-slide">
      <div class="slide">
        <div class="image_box">
          <img src="${element.imageUrl}" alt="${element.textStrong}">
          <div class="bookmark_box">
          <input type="checkbox" data-id="${uniqueId}" class="bookmark" checked="false"  name="this_week_bookmark">
          <label data-id="${uniqueId}" aria-label="북마크"></label>
          <p class="save_message">
            나중에 볼 교육으로 저장 되었습니다.
          </p>
          </div>
        </div>
        <div class="text_box">
          <strong class="content_title">${element.textStrong}</strong>
          <div class="content">
            <ul class="tag_list">`;
              element.tags.forEach((tag) => {
                html += `<li class="tag">${tag}
                                          </li>`;
              });
            html += `</ul>
            <p class="description">${element.desc}</p>
            <ul class="course_summary">
              <li class="detail_item">${element.manager}</li>
              <li class="detail_item">${element.running}</li>
              <li class="detail_item">${element.total}개 강의</li>
            </ul>
            </p>
          </div>
        </div>
      </div>
      <a href="" class="link_slide">
        <span class="blind">링크</span>
      </a>
    </li>`;
  });
  document.querySelector(".section_this_week .swiper-wrapper").innerHTML =
    html;

  new Swiper(".section_this_week .swiper", {
    a11y: commonA11ySettings,
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 16,
    initialSlide: 0,
    clickable: false,
    on: {
      transitionEnd: function () {
        anchor(this);
      },
    },
    breakpoints: {
      850: {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 24,
        centeredSlides: false,
        clickable: false,
      },
    },
  });

  document.querySelectorAll("label[data-id]").forEach((label) => {
    const dataId = label.getAttribute("data-id");
    const input = document.querySelector(`input[data-id="${dataId}"]`);
    if (input) {
      label.setAttribute("for", (input.id = dataId));
    }
  });


  const bookmark = document.querySelectorAll(" section_this_week .bookmark");
  bookmark.forEach((check) => {
    check.onchange = (e) => {
      if (e.target.checked === false) {
        e.target.parentNode.classList.add("is_checked");
      } else {
        e.target.parentNode.classList.remove("is_checked");
      }
    };
  });
}

const  lineUpList = async () => {
  const commonA11ySettings = {
    enabled: true,
    containerMessage: "프로모션 슬라이드 영역입니다.",
    slideLabelMessage:
      "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    firstSlideMessage: "첫번째 슬라이드입니다.",
    lastSlideMessage: "마지막 슬라이드입니다.",
    paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
    containerRoleDescriptionMessage: "Carousel",
    itemRoleDescriptionMessage: "Slide",
    slideRole: "listitem",
  };

  const res = await fetch("./data.json");
  const json = await res.json();
  let data = json.lineUp;
  let html = ``;
  data.forEach((element, index) => {
    const uniqueId = `lineUp_${index}_${Math.random()
      .toString(36)
      .slice(2, 11)}`;
    html += `<li class="swiper-slide">
      <div class="image_box">
        <img src="${element.imageUrl}" alt="${element.textStrong}">
        <div class="bookmark_box">
        <input type="checkbox" data-id="${uniqueId}" class="bookmark" checked="false" 
        name="lineUp_bookmark">
        <label data-id="${uniqueId}" aria-label="북마크"></label>
        <p class="save_message">
          나중에 볼 교육으로 저장 되었습니다.
        </p>
        </div>
      </div>
      <div class="text_box">
        <strong class="content_title">${element.textStrong}</strong>
        <ul class="course_summary">
          <li class="detail_item">${element.manager}</li>
          <li class="detail_item">${element.running}</li>
          <li class="detail_item">${element.total}개 강의</li>
        </ul>
        <button class="more_button" type="button" aria-expanded="false" 
        aria-controls="more_content_${index}">더보기</button>
        <div class="more_area" id="more_content_${index}" aria-hidden="true">`;
          element.paragraph.forEach((content) => {
          html += `<div>
            <p class="more_title">${content.title}</p>
            <p class="more_content">
            ${content.moreContent}
            </p>
          </div>`;
          });
        html += `</div>
      </div>
      <a href="" class="link_slide">
        <span class="blind">링크</span>
      </a>
    </li>`;
  });

  document.querySelector(".section_line_up .swiper-wrapper").innerHTML =
    html;

  new Swiper(".section_line_up .swiper", {
    a11y: commonA11ySettings,
    slidesPerView: 3,
    spaceBetween: 16,
    clickable: false,
    breakpoints: {
      850: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: ".section_line_up .next_button",
      prevEl: ".section_line_up .prev_button",
    },
    on: {
      activeIndexChange: function () {
        document
          .querySelector(".section_line_up .prev_button")
          .classList.add("is_show");
      },
    },
  });

  document.querySelectorAll("label[data-id]").forEach((label) => {
    const dataId = label.getAttribute("data-id");
    const input = document.querySelector(`input[data-id="${dataId}"]`);
    if (input) {
      label.setAttribute("for", (input.id = dataId));
    }
  });
  
  const bookmark = document.querySelectorAll(".section_line_up .bookmark");
  bookmark.forEach((check) => {
    check.onchange = (e) => {
      if (e.target.checked === false) {
        e.target.parentNode.classList.add("is_checked");
      } else {
        e.target.parentNode.classList.remove("is_checked");
      }
    };
  });
} 

const newEducationList = async () => {
  const commonA11ySettings = {
    enabled: true,
    containerMessage: "프로모션 슬라이드 영역입니다.",
    slideLabelMessage:
      "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    firstSlideMessage: "첫번째 슬라이드입니다.",
    lastSlideMessage: "마지막 슬라이드입니다.",
    paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
    containerRoleDescriptionMessage: "Carousel",
    itemRoleDescriptionMessage: "Slide",
    slideRole: "listitem",
  };

  const res = await fetch("./data.json");
  const json = await res.json();
  let data = json.newEducation;
  let html = ``;
  data.forEach((element, index) => {
    const uniqueId = `new_education_${index}_${Math.random()
      .toString(36)
      .slice(2, 11)}`; 
    html += `<li class="swiper-slide">
      <div class="slide">
        <div class="image_box">
          <img src="${element.imageUrl}" alt="${element.textStrong}">
          <div class="bookmark_box"> 
          <input type="checkbox" data-id="${uniqueId}" class="bookmark" checked="false" name="new_education_bookmark">
          <label data-id="${uniqueId}" aria-label="북마크"></label>
          <p class="save_message">
            나중에 볼 교육으로 저장 되었습니다.
          </p>
          </div>
        </div>
        <div class="text_box">
          <strong class="content_title">${element.textStrong}
          </strong>
          <div class="content">
            <ul class="tag_list">`;
              element.tags.forEach((tag) => {
                html += `<li class="tag">${tag}
                        </li>`;
              });
            html += `</ul>
            <p class="description">
            ${element.desc}
            </p>
            <ul class="course_summary">
              <li class="detail_item">${element.manager}</li>
              <li class="detail_item">${element.running}</li>
              <li class="detail_item">${element.total}개 강의</li>
            </ul>
          </div>
        </div>
            <input type="checkbox" data-id="${uniqueId}" class="bookmark" name="new_education_bookmark">
        <label data-id="${uniqueId}" aria-label="북마크"></label>
      </div>
      <a href="" class="link_slide">
        <span class="blind">링크</span>
      </a>
    </li>`;
  });

  document.querySelector(".section_new_education .swiper-wrapper").innerHTML =
    html;

  new Swiper(".section_new_education .swiper", {
    a11y: commonA11ySettings,
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 16,
    initialSlide: 0,
    clickable: false,
    on: {
      transitionEnd: function () {
        anchor(this);
      },
    },
    breakpoints: {
      850: {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: false,
        centeredSlides: false,
        clickable: false,
      },
    },
  });

  document.querySelectorAll("label[data-id]").forEach((label) => {
    const dataId = label.getAttribute("data-id");
    const input = document.querySelector(`input[data-id="${dataId}"]`);
    if (input) {
      label.setAttribute("for", (input.id = dataId));
    }
  });

  const bookmark = document.querySelectorAll(".bookmark");
  bookmark.forEach((check) => {
    check.onchange = (e) => {
      if (e.target.checked === false) {
        e.target.parentNode.classList.add("is_checked");
      } else {
        e.target.parentNode.classList.remove("is_checked");
      }
    };
  });
};

const noticeList = async () => {
  const res = await fetch("./data.json");
  const json = await res.json();
  let data = json.notice;
  let html = ``;
  data.forEach((element) => {
    html += `<li class="notice_item">
        <a href="" class="notice_link">
          <ul class="tag_list">`;
    element.tags.forEach((tag) => {
      html += `<li class="tag">${tag}
              </li>`;
    });
    html += `</ul>
          <strong class="content_title">${element.textStrong}</strong>
          <p class="date">${element.date}</p>
        </a>
      </li>`;
  });
  document.querySelector(".section_notice .notice_list").innerHTML = html;
};

const fetchAndRenderAllLists = () => {
  Promise.all([
    handleAsyncProcess(onlineEducationList),
    handleAsyncProcess(thisWeekList),
    handleAsyncProcess(lineUpList),
    handleAsyncProcess(newEducationList),
    handleAsyncProcess(noticeList),
  ]).then(() => {
    return
  });
};

window.onload = ()=> {
  fetchAndRenderAllLists();
};



/** 
 *  @pcGnb_subList
 * 
*/
const header = document.querySelector(".header");
const headerInner = document.querySelector(".header > .inner")
const backDimmed = document.querySelector(".back_dimmed");
const pcGnb = document.querySelector(".gnb_pc");

pcGnb.addEventListener("mouseenter", function () {
  let maxSubListHeight = 0;
  const subList = document.querySelectorAll(".header .sub_list");

  subList.forEach((subItem) => {
    subItem.classList.add("is_show");
    const subItemHeight = subItem.offsetHeight;
    if (subItemHeight > maxSubListHeight) {
      maxSubListHeight = subItemHeight;
    }
  });
  backDimmed.style.height = `${maxSubListHeight + headerInner.offsetHeight}px`;
});

header.addEventListener("mouseleave", function () {
  const subList = document.querySelectorAll(".header .sub_list");
  subList.forEach((subItem) => {
    subItem.classList.remove("is_show");
  });
  backDimmed.style.height = "auto";
});


/** 
 *  @search_button_in_header
 *  @mobileGnb
 * 
*/
const mobileGnb = document.querySelector(".gnb_mobile");
const searchBtn = document.querySelector(".search_button");
const searchCloseBtn = document.querySelector(".search_close_button");
const input = document.querySelector("input[type=text]")
const hamburgerMenu = document.querySelector(".hamburger_menu");

searchBtn.onclick = (e) => {
  if (e.target.ariaPressed === "false") {
    e.target.ariaPressed = true;
    searchCloseBtn.ariaPressed = false;
    header.classList.add("is_search_area_active")
    input.focus()
  } else {
    e.target.ariaPressed = false;
    header.classList.remove("is_search_area_active");
  }
};

searchCloseBtn.onclick = (e) =>{
  header.classList.remove("is_search_area_active");
  if (e.target.ariaPressed === "false") {
    e.target.ariaPressed = true;
  } else {
    e.target.ariaPressed = false;
  }
};

hamburgerMenu.onclick = (e) => {
  document.body.classList.toggle("scroll_hide");
  mobileGnb.classList.toggle("is_active");
  searchBtn.classList.toggle("is_gnb_active");
  header.classList.toggle("is_gnb_active");
  if (e.target.ariaExpanded === "false") {
    e.target.ariaExpanded = true;
    e.target.ariaPressed = true;
  } else {
    e.target.ariaExpanded = false;
    e.target.ariaPressed = false;
  }
};


/**
 * 
 * @mobileGnbSubList
 * @returns 
 */
const handleClick = function(e) {
  e.preventDefault();
  const navList = e.target.parentNode.parentNode;
  const navItem = e.target.parentNode;
  const subList = e.target.parentNode.querySelector(".sub_list"); 
  if (navList.classList.contains("my_info")) {
    if (e.target.ariaExpanded  === "false") {
      e.target.ariaExpanded = true;
    }else{
      e.target.ariaExpanded = false;
    }
  } else {
    if (subList) {
      [...navList.children].forEach((item) => {
        if (item === navItem) {
          if (e.target.ariaExpanded === "false") {
            e.target.ariaExpanded = true;
            e.target.ariaHasPopup = true;
          } else {
            e.target.ariaExpanded = false;
            e.target.ariaHasPopup = false;
          }
        } else {
          const nonActiveSubList = [...item.children].find((element) =>
            element.classList.contains("nav_item_title")
          );
          nonActiveSubList.ariaExpanded = false;
          e.target.ariaHasPopup = false;
        }
      });
    }
    return;
  }
};

document.querySelectorAll(".gnb_mobile .nav_item").forEach((navItem) => {
  navItem.addEventListener("click", handleClick);
});


/**
 * @profile
 */
const profile = document.querySelector(".profile_image");

profile.addEventListener("mouseenter", function (e) {
  e.target.ariaHasPopup = true;
});

profile.addEventListener("mouseleave", function (e) {
    e.target.ariaHasPopup = false;
});


/**
 * @more_button
 * @tooltip
 */
document.addEventListener("click",(function(e){
  if (e.target.classList.contains("more_button")) {
    e.target.ariaExpanded = true;
    e.target.nextElementSibling.ariaHidden = false;
  }
  if (e.target.classList.contains("tooltip")) {
    if (e.target.ariaExpanded === "false") {
      e.target.ariaExpanded = true;
      e.target.ariaHasPopup = true;
    } else {
      e.target.ariaExpanded = false;
      e.target.ariaHasPopup = false;
    }
    [...e.target.children].forEach(tip => {
      tip.ariaHidden = false
    })
  }
}))


/**
 * @related
 */

const relatedArea = document.querySelector(".related_area");

relatedArea.onclick = (e) => {
  e.preventDefault();
  if (e.target.ariaExpanded === "false") {
    e.target.ariaExpanded = true;
    e.target.parentNode.classList.add("is_show");
  } else {
    e.target.ariaExpanded = false;
    e.target.parentNode.classList.remove("is_show");
  }
};


/**
 * @info
 */
const companyInfo = document.querySelector(".company_info_wrap");

companyInfo.onclick = (e) => {
  e.preventDefault();
  e.target.parentNode.classList.toggle("is_show");
};


const isMobileDevice = (mediaQuery) => mediaQuery.matches;

const setupDeviceChangeListener = () => {
  const mediaQuery = window.matchMedia("(max-width: 850px)"); 
  let previousDeviceState = isMobileDevice(mediaQuery) ? "mobile" : "desktop";

  const handleDeviceChange = () => {
    const currentDeviceState = isMobileDevice(mediaQuery) ? "mobile" : "desktop";

    if (currentDeviceState !== previousDeviceState) {
      if (currentDeviceState !== "mobile") {
          document.querySelectorAll(".is_gnb_active").forEach((element) => {
          element.classList.remove("is_gnb_active");
        });
        document.body.classList.remove("scroll_hide");
      } 
      previousDeviceState = currentDeviceState;
    }
  };

  handleDeviceChange();
  mediaQuery.addEventListener("change", handleDeviceChange);
};

setupDeviceChangeListener();

