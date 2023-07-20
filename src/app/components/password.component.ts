import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-password',
    styleUrls: ['./password.component.css'],
    templateUrl: './password.component.html',
})
export class PasswordComponent implements OnChanges {
    section1: string;
    section2: string;
    section3: string;

    @Input() public passwordToCheck: string;

    @Output() passwordStrength = new EventEmitter<boolean>();

    colors = ['#D22B2B', '#FFC710', '#3CB371']; // Red, yellow, green

    message: string;
    messageColor: string;

    checkStrength(password: string) {
        let strength = 0;

        const letters = /[A-Za-z]+/.test(password);
        const numbers = /[0-9]+/.test(password);
        const symbols = (/[$-/:-?{-~!"^_@`\[\]]/g).test(password);

        // Easy: letters OR numbers OR symbols
        if (password.length >= 8 && (letters || numbers || symbols)) strength = 1

        // Medium: letters-symbols OR letters-numbers OR numbers-symbols
        if (password.length >= 8 && ((letters && symbols) || (letters && numbers) || (numbers && symbols))) strength = 2

        // Hard: letters AND numbers AND symbols
        if (password.length >= 8 && (letters && numbers && symbols)) strength = 3

        return strength;
    }

    getColor(strength: number) {
        let index = 0;

        if (strength === 1 || strength === 0) index = 0; // Red for length < 8 and easy password
        else if (strength === 2) index = 1; // Yellow for medium
        else if (strength === 3) index = 2; // Green for hard

        this.messageColor = this.colors[index];

        return {
            index: index + 1,
            color: this.colors[index],
        };
    }

    setSectionColors(count: number, color: string) {
        for (let i = 1; i <= count; i++) {
            (this as any)['section' + i] = color;
        }
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        const password = changes['passwordToCheck'].currentValue;

        // Setting default color
        this.setSectionColors(3, 'gainsboro');

        if (password) {
            // Getting color by strength
            const color = this.getColor(this.checkStrength(password));

            if (password.length < 8) {
                // Setting this color in sections
                this.setSectionColors(3, color.color) // If password is short all sections are red
            } else {
                this.setSectionColors(color.index, color.color);
            }

            const strength = this.checkStrength(password);

            switch (strength) {
                case 0:
                    this.message = 'Password must be at least 8 characters long';
                    break;
                case 1:
                    this.message = 'Easy';
                    break;
                case 2:
                    this.message = 'Medium';
                    break;
                case 3:
                    this.message = 'Strong';
                    break;
            }
        } else {
            this.message = '';
        }
    }
}