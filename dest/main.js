// add background header when scroll
let header = document.querySelector("header");
let slider = document.querySelector(".slider");
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;
function changeBgHeader() {
    let scrollY = window.pageYOffset;
    if (scrollY > heightSlider - heightHeader - 90) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}

//change langues
let lang = document.querySelector(".lang");
let langCurrent = document.querySelector(".lang .lang__current span");
let langOption = document.querySelector(".lang .lang__option");
let langItem = document.querySelectorAll(".lang .lang__option a");
lang.addEventListener("click", function () {
    lang.classList.toggle("active");
});
langItem.forEach(function (item) {
    item.addEventListener("click", function () {
        let langText = this.textContent;
        let langCurrentSpan = langCurrent.textContent;
        langCurrent.innerHTML = langText;
        this.innerHTML = langCurrentSpan;
    });
});
//back to top
let backtotop = document.querySelector(".totop");
function showBackToTop() {
    let scrollY = window.pageYOffset;
    if (scrollY > 500) {
        backtotop.classList.add("active");
    } else {
        backtotop.classList.remove("active");
    }
}
backtotop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
    });
});

document.addEventListener("scroll", function () {
    changeBgHeader();
    showBackToTop();
});

// button hamburger mobile
let btnMenu = document.querySelector(".hamburger");
let nav = document.querySelector(".nav");
btnMenu.addEventListener("click", function () {
    btnMenu.classList.toggle("active");
    nav.classList.toggle("active");
});

//slider
// let listItemSlider = document.querySelectorAll(".slider__item");
// let currentSlider = 0;
// let number = document.querySelector(".number");
// let dot_li = document.querySelectorAll(".dotted li");
// listItemSlider.forEach(function (itemSlider, index) {
//     if (itemSlider.classList.contains("active")) {
//         currentSlider = index;
//     }
// });
// document.querySelector(".btnctr.next").addEventListener("click", function () {
//     if (currentSlider < listItemSlider.length - 1) {
//         goTo(currentSlider + 1);
//         // listItemSlider[currentSlider].classList.remove("active");
//         // listItemSlider[currentSlider + 1].classList.add("active");
//         // currentSlider++;
//     } else {
//         goTo(0);
//         // listItemSlider[currentSlider].classList.remove("active");
//         // listItemSlider[0].classList.add("active");
//         // currentSlider = 0;
//     }
// });
// document.querySelector(".btnctr.prev").addEventListener("click", function () {
//     if (currentSlider > 0) {
//         goTo(currentSlider - 1);
//         // listItemSlider[currentSlider].classList.remove("active");
//         // listItemSlider[currentSlider - 1].classList.add("active");
//         // currentSlider--;
//     } else {
//         goTo(listItemSlider.length - 1);
//         // listItemSlider[currentSlider].classList.remove("active");
//         // listItemSlider[listItemSlider.length - 1].classList.add("active");
//         // currentSlider = listItemSlider.length - 1;
//     }
// });

// function goTo(index) {
//     listItemSlider[currentSlider].classList.remove("active");
//     listItemSlider[index].classList.add("active");
//     dot_li[currentSlider].classList.remove("active");
//     dot_li[index].classList.add("active");
//     currentSlider = index;
//     showNumber(currentSlider + 1);
// }

// function showNumber(index) {
//     number.innerHTML = index.toString().padStart(2, "0");
// }

// //default
// showNumber(currentSlider + 1);
// dot_li[currentSlider].classList.add("active");

// dot_li.forEach(function (li, index) {
//     li.addEventListener("click", function () {
//         goTo(index);
//     });
// });

//popup video
let button_video = document.querySelectorAll(".video__item-img");
let popup_video = document.querySelector(".popup-video");
let close_popup_video = document.querySelector(".close");
let iframe = document.querySelector("iframe");
button_video.forEach(function (button) {
    button.addEventListener("click", function () {
        let videoId = button.getAttribute("data-video-id");
        iframe.setAttribute("src", "https://www.youtube.com/embed/" + videoId);
        popup_video.style.display = "flex";
    });
});
close_popup_video.addEventListener("click", function () {
    iframe.setAttribute("src", "");
    popup_video.style.display = "none";
});

document.querySelector(".popup-video").addEventListener("click", function () {
    iframe.setAttribute("src", "");
    popup_video.style.display = "none";
});

//scroll active section
let menus = document.querySelectorAll(".menu a");
let heightMenu = document.querySelector("header").offsetHeight;
let sections = [];
function removeActiveMenu() {
    menus.forEach(function (menu_element, index_element) {
        menu_element.classList.remove("active");
    });
}
menus.forEach(function (element, index) {
    let className = element.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);
    element.addEventListener("click", function (e) {
        e.preventDefault();

        let positionSection = section.offsetTop;
        window.scrollTo({
            top: positionSection - heightMenu + 1,
            behavior: "smooth",
        });
        removeActiveMenu();
        element.classList.add("active");
    });
});

window.addEventListener("scroll", function (e) {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
        if (
            positionScroll > section.offsetTop - heightMenu &&
            positionScroll < section.offsetTop + section.offsetHeight
        ) {
            removeActiveMenu();
            menus[index].classList.add("active");
        } else {
            menus[index].classList.remove("active");
        }
    });
});
//
let $carousel = $(".slider__item-wrap").flickity({
    // options
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    on: {
        ready: function () {
            let dotted = $(".flickity-page-dots");
            paging = $(".slider__bottom-paging .dotted");
            dotted.appendTo(paging);
        },
        change: function (index) {
            let number = $(".slider__bottom-paging .number");
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2, 0));
        },
    },
});

//previous
$(".slider__bottom-control .prev").on("click", function () {
    $carousel.flickity("previous");
});
$(".slider__bottom-control .next").on("click", function () {
    $carousel.flickity("next");
});

var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute("data-size").split("x");
            item = {
                src: linkEl.getAttribute("href"),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute("src");
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return el.tagName && el.tagName.toUpperCase() === "FIGURE";
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split("&");
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split("=");
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll(".pswp")[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute("data-pswp-uid"),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};
initPhotoSwipeFromDOM(".gallery__grid");
