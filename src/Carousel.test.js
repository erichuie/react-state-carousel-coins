import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container, debug } = render(
    <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
  );
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  //expect the last image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  //move backward in the carousel
  //space between elements in query selector looks for descendant of a selector
  //.bi bi-arrow-left-circle looks for descendant of bi that
  // is bi-arrow-left-circle
  //we want look for both classes individually of .bi and .bi-arrow-left-circle
  const leftArrow = container.querySelector(".bi.bi-arrow-left-circle");
  debug(leftArrow)
  fireEvent.click(leftArrow);

  //expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("left arrow missing on first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the first image to show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  // expect right arrow visible
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).toBeInTheDocument();

  // expect left arrow to not be visible
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  // const rightArrow = container.querySelector(".bi-arrow-right-circle");
  // fireEvent.click(rightArrow);

  // // expect the second image to show, but not the first
  // expect(
  //   container.querySelector('img[alt="testing image 1"]')
  // ).not.toBeInTheDocument();
  // expect(
  //   container.querySelector('img[alt="testing image 2"]')
  // ).toBeInTheDocument();
});

it("right arrow missing on last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the last image to show
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();

  // expect right arrow to not be visible
  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).not.toBeInTheDocument();

  // expect left arrow to be visible
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument();
});

//smoke test
it("renders without crashing", function() {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
});

//snapshot test
it("matches snapshot", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  expect(container).toMatchSnapshot();
});
