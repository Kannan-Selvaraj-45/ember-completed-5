export default function () {
  this.transition(
    this.fromRoute('movies'),
    this.toRoute('add-movie'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );

  this.transition(
    this.fromRoute('movies'),
    this.toRoute('edit-movie'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );

  this.transition(
    this.fromRoute('add-movie'),
    this.toRoute('bi-scroll'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );

  this.transition(
    this.fromRoute('bi-scroll'),
    this.toRoute('dynamic-content'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );

  this.transition(
    this.fromRoute('add-movie'),
    this.toRoute('daterange'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );

  this.transition(
    this.fromRoute('daterange'),
    this.toRoute('multipleselect'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );



  this.transition(
    this.fromRoute('add-movie'),
    this.toRoute('groupselect'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );

  this.transition(
    this.fromRoute('groupselect'),
    this.toRoute('selectmultiple'),
    this.use('toLeft', { duration: 500, easing: 'easeInOut' }),
    this.reverse('toRight', { duration: 500, easing: 'easeInOut' }),
  );
}
