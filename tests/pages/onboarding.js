import {
  attribute,
  clickable,
  collection,
  create,
  fillable,
  hasClass,
  text,
  triggerable,
  visitable
} from 'ember-cli-page-object';
import skillsTypeahead from './components/skills-typeahead';
import navMenu from './components/navigation-menu';

export default create({
  start: visitable('/start'),
  interests: visitable('/start/interests'),
  skills: visitable('/start/skills'),
  expertise: visitable('/start/expertise'),

  firstName: fillable('[name="firstName"]'),
  firstNameEnter: triggerable('keyup', '[name="firstName"]', { eventProperties: { keyCode: 13 } }),
  lastName: fillable('[name="lastName"]'),
  lastNameEnter: triggerable('keyup', '[name="lastName"]', { eventProperties: { keyCode: 13 } }),
  clickCategoryItem: clickable('.category-item button'),

  footer: {
    scope: '.site-footer'
  },

  startButton: {
    scope: '.start__footer button',
    isDisabled: attribute('disabled')
  },

  roleColumns: collection({
    itemScope: '.expertise__column',

    item: {
      hasClass,

      header: {
        scope: 'h3',
        title: text()
      },

      roles: collection({
        itemScope: '.role-item',

        item: {
          button: {
            scope: 'button',
            text: text(),
            hasClass
          }
        }
      })
    }
  }),

  userSkillsList: collection({
    scope: '.skills__list',
    itemScope: 'button',
    item: {
      text: text(),
      click: clickable()
    }
  }),

  // select and manipulate .skills-typeahead and various site-chrome nodes to
  // this page
  skillsTypeahead,
  navMenu
});
