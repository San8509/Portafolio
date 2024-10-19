import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function js( done ) {
    src('src/js/app.js')
        .pipe( dest('build/js') ) 
    done()
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css', {sourcemaps: '.'}) )

    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)// mira por los cambios de los archivos js en la ruta especificada
}

// series compila una tarea y la finaliza y sigue a la siguiente y lo mismo segun el orden que le indiques
export default series( js, css, dev ); 