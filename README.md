# Ltv Coding Challenge

Hello World!

Thanks for taking the time to review my submission for the Ltv coding challenge! I had a lot of fun working on this challenge and I just wanted to take the opportunity to explain anything that might not be clear and let you know what I was thinking when I wrote this code since we wont have the opportunity to talk about in person!

1. Order - The commits are in the following order: refactor, QA, featurework (and a few small refactors), and misc. I decided to tackle the refactoring first in order to make the rest of the project easier to execute. Then I decided to tackle QA issues to get the project ready to ship. Once we had a working project to ship, only then did I attempt to tackle adding in the new feature.

2. Refactoring - Generally I tried to encapsulate functionality into DRY reusable chunks. I approached the refactor with a `top down` approach starting from the `$(document).ready(...)` and breaking things apart and writing more declaritively on my way down. So this is a good place to start in your review of the code as well. This aims to make the code more readable for developers who are seeing it for the first time. I also tried to break constants out where practical for easy updates in the future.

3. Selectors - Wherever possible I tried to use `id`'s (`$(#...)`) to select element in the `js` and `jquery`. I did this to be as semantic and specific as possible not only for the current state of the project but also for future development. There are a few situations where using a class made more sense, such as cases where I actually need to get more than one element, so you will see that occasionally as you look through the code.

4. QA issues - I solved the issue of the features being out of order primarily with simple `flex-box`. This seemed like the simplest and most elegant solution. I am still taking advantage of the Bootstrap classes provided.

5. Feature Implementation - So I did a quick and dirty `js class` called `SearchState` which basically keeps a reference to which button (email or phone number) was last pushed which can be read to determine which class each button should have and also which query should be made. This class should be extendable should the need to do so arise in future development.

6. Other bugs:

- Relatives in result view should have a `margin-bottom` of `5px`

- Tablet and Mobile view were inheriting their `padding-top` and `padding-bottom` from `section` styles which was throwing off the layout slightly.

- The navbar's left and right margin were too large in tablet and mobile view.

- The new search naviagtion buttons that I added should have a `font-size` of `14px` in mobile view according to the mockup. This didn't look right at all and upon closer inspection of the actual text in the mock up they're actually closer to `16px`, so I adjusted them to `16px`. We should follow up on this one though.

- Various responsive font sizing issues on tablet and mobile results page.
