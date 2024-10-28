document.addEventListener('alpine:init', () => {
  Alpine.data('pagination', (data) => {
    const { props } = data;
    return {
      props,
    };
  });
});
