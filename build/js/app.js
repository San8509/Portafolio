document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
})

function navegacionFija() {
    const header = document.querySelector('.header');
    const galeria = document.querySelector('.galeria');

    const contenedor = document.createElement('DIV');
    contenedor.classList.add('contenedor_enlaces-header');

  
    document.addEventListener('scroll', function() { 
        if(galeria.getBoundingClientRect().bottom < 969.25) {
            header.classList.add('fixed');
            header.appendChild(contenedor);
        } else {
            header.classList.remove('fixed');
        }
    })
}


function crearGaleria() {
    const CANTIDAD_IMAGENES = 6;
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.png`;
        imagen.alt = 'Imagen Galería';

        // Event Handler
        imagen.onclick = ()=> {
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.png`;
    imagen.alt = 'Imagen Galería';

    const tooltip = document.createElement('span');
    tooltip.textContent = 'Click IMG';
    tooltip.className = 'tooltip';
    
    // link a la pagina
    const link = document.createElement('A');
    link.href = '';
    link.target = '';
    link.className='link';
    
    // Generar Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    //modal.onclick = cerrarModal;

    // Botón cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    link.appendChild(tooltip);
    link.appendChild(imagen);
    modal.appendChild(link);
    modal.appendChild(cerrarModalBtn);

    // Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    const header = document.querySelector('header');

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}

function downloadCv(){
   const cv = document.getElementById('download_cv');
   cv.href='cv/RSVCurriculum.docx-1.pdf';
   cv.download= 'RSVCurriculum.pdf';
}
