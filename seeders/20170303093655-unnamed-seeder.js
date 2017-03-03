'use strict';

var photos = [
  {
    author: 'Mountain Pig',
    link: 'https://www.brycecanyoncampgrounds.com/wp-content/uploads/2016/02/bryce-canyon-tipi-rentals-1030x687.jpg',
    description: 'Mountain Pig\'s love shack',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    author: 'Shikaka',
    link: 'https://fsrn.org/wp-content/uploads/2014/02/Grass-Hut-.jpg',
    description: 'Shikaka\'s love shack',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    author: 'Pedro',
    link: 'http://3.bp.blogspot.com/-yqv29bg4V20/Uytf3ctvSxI/AAAAAAAAAbQ/_RRddwk7IJs/s1600/adobe+hut.jpg',
    description: 'Pedro\'s love shack',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', photos);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos', photos);
  }
};
