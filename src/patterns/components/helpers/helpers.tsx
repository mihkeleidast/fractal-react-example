import React from 'react';

if (process.env.webpack) {
    require('./helpers.scss');
}

export default class Helpers extends React.Component<{}, {}> {
    static disableBodyScroll(hideScrollbar: boolean) {
        if (!document.body.classList.contains('is-scroll-disabled')) {
            if (document.documentElement) {
                const curScroll = document.documentElement.scrollTop;

                document.body.classList.add('is-scroll-disabled');
                document.body.style.top = -curScroll + 'px';
            }
        }
    }

    static enableBodyScroll() {
        const bodyScroll = parseInt(document.body.style.top || '0', 10);

        document.body.classList.remove('is-scroll-disabled');

        if (bodyScroll && document.documentElement) {
            document.documentElement.scrollTop = -bodyScroll;
            document.body.style.top = null;
        }
    }

    static isURL(str: string) {
        const regexp = /^https?:\/\//i;

        return regexp.test(str);
    }

    static toFixed(n: number, prec: number): number {
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        let k = Math.pow(10, prec);

        return Math.round(n * k) / k;
    }

    static formatNumber(num: number, decimals: number = 2, decPoint: string = '.', thousandsSep: string = ''): string {
        let n    = !isFinite(+num) ? 0 : +num;
        let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        let sep  = thousandsSep === null ? ' ' : thousandsSep;
        let dec  = decPoint === null ? ',' : decPoint;
        let s    = (prec ? Helpers.toFixed(n, prec) : Math.round(n)).toString().split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }

        return s.join(dec);
    }

    static parseFloat(val: string): number {
        let num = parseFloat(val);
        if (typeof num == 'number' && !isNaN(num)) {
            return num;
        } else {
            return 0;
        }
    }

    static get isIE(): boolean | number {

        const ua: string   = window.navigator.userAgent;
        const msie: number = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number

            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        const trident: number = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');

            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        const edge: number = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser

        return false;
    }

    static get isMobileDevice(): boolean {

        return ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) ? true : false);
    }

    render() {
        return 'This component is not actually a React component.';
    }
}
