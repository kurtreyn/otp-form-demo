# OTP Form Demo

## Usage

Using Node version 14.15.4

```
nvm use
```

Install dependencies

```
npm install
```

Run the application

```
npm start
```

---

Information about creating the OTP component was found in a Medium.com article <em>["Making OTP Input in Angular"](https://sergeygultyayev.medium.com/making-otp-input-in-angular-c053b8fddc47)</em> by <strong>Sergey Gultyayev.</strong>

<br><br>
Notable Items from the article:
<em>

- It’s customary for OTP inputs to have 4–6 digits in it, but instead of hard coding all the fields we could enable the consumer to define how many digits they would want to have.
- We are accessing the property controls on `FormArray` which contains all our controls. Then, we are using `$any(input)` to pass the `FormControl` to the `[formControl]` input. $any makes a typecast to any in TypeScript which is a bad thing to use usually, but here we will neglect it as we know for sure that it’s a `FormControl` and not some mere `AbstractFormControl`
- We set type="text" and inputmode="numeric" which might leave you wondering why not just type="number" . But, if you remember how type="number" works you will recall that it: adds increment/decrement buttons, can have negative values. Instead, we want to use regular text input and have inputmode="numeric" on it so that touch devices will show numeric keyboard

```
handleKeyPress(e: KeyboardEvent, idx: number) {
  const isDigit = /\d/.test(e.key);

  // Safari fires Cmd + V through keyPress event as well
  // so we need to handle it here and let it through
  if (e.key === 'v' && e.metaKey) {
    return true;
  }
```

```
#focusInput(idx: number) {
  // In order not to interfere with the input we setTimeout
  // before advancing the focus
  setTimeout(() => this.inputEls.get(idx)?.nativeElement.focus());
}
```

```
#updateWiredValue() {
  // We want to expose the value as a plain string
  //
  // In order not to interfere with the input we setTimeout
  // before advancing the focus
  setTimeout(() => this.onChange?.(this.inputs.value.join('')));
}
```

- we are using `#scheduledFocus` property to set an index and then handle input event for focus change & value updates. Well, this is a workaround for mobile Safari where it fires events in a different order than desktop browsers do. This is what cross-browser looks like.
- This `autocomplete` not only suggests for mobile users to fill in with SMS codes, but also enables Authenticators to fill in with one time codes generated
