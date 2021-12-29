const page404 = () => {
    const page404Wrapper = document.querySelector('.page404__wrapper');

    const toggleStickContentToTop = () => {
        if (page404Wrapper.offsetHeight + 200 > window.innerHeight) {
            page404Wrapper.closest('.page404').style.alignItems = 'flex-start';
        } else {
            page404Wrapper.closest('.page404').style.alignItems = '';
        }
    };

    window.addEventListener('load', () => {
        toggleStickContentToTop();
    });

    window.addEventListener('resize', () => {
        toggleStickContentToTop();
    });

    setTimeout(() => {
        window.location.replace('index.html');
    }, 8000);
};

export default page404;
