declare module 'react-native-qrcode-svg' {
    import { Component } from 'react';
    
    interface QRCodeProps {
        value: string;
        size?: number;
        color?: string;
        backgroundColor?: string;
        logo?: any;
        logoSize?: number;
        logoBackgroundColor?: string;
        logoMargin?: number;
        logoBorderRadius?: number;
        quietZone?: number;
        enableLinearGradient?: boolean;
        gradientDirection?: string[];
        linearGradient?: string[];
        ecl?: 'L' | 'M' | 'Q' | 'H';
        getRef?: (c: any) => void;
    }

    export default class QRCode extends Component<QRCodeProps> {}
} 