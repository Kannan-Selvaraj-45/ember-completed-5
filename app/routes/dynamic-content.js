import Route from '@ember/routing/route';

export default class DynamicContentRoute extends Route {
  model() {
    const texts = [
      'Short note.',
      'A medium-sized piece of information that adds more height.',
      'A much longer block of text to simulate dynamic height in a vertical collection. It could contain multiple lines, especially on smaller screens, and shows how the virtualization handles size variation.',
      'Tiny!',
      'Another medium block. More rows, more fun!',
    ];


    const numbers = [];
    for (let i = 0; i < 1000; i++) {
      numbers.push({
        number: i + 1,
        text: texts[Math.floor(Math.random() * texts.length)],
      });
    }

    return { numbers };
    

    // return {
    //   numbers: Array.from({ length: 1000 }, (_, i) => ({
    //     number: i + 1,
    //     text: texts[Math.floor(Math.random() * texts.length)],
    //   })),
    // };
  }
}
