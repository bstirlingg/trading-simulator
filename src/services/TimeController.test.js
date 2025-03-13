import { TimeController } from './TimeController';

describe('TimeController', () => {
  let controller;
  const mockData = [
    { date: '2023-01-01', close: 100 },
    { date: '2023-01-02', close: 105 },
    { date: '2023-01-03', close: 103 },
    { date: '2023-01-04', close: 107 },
    { date: '2023-01-05', close: 110 },
  ];

  // Create a fresh TimeController instance before each test
  beforeEach(() => {
    controller = new TimeController(mockData);
  });

  // Verify that the controller starts at the first data point
  test('should initialize with index at 0', () => {
    expect(controller.getCurrentIndex()).toBe(0);
    expect(controller.getCurrentData()).toEqual(mockData[0]);
  });

  // Check that the next() method correctly advances to the next data point
  test('should move to next data point', () => {
    controller.next();
    expect(controller.getCurrentIndex()).toBe(1);
    expect(controller.getCurrentData()).toEqual(mockData[1]);
  });

  // Ensure that previous() method works correctly when not at the first index
  test('should move to previous data point', () => {
    controller.setCurrentIndex(2);
    controller.previous();
    expect(controller.getCurrentIndex()).toBe(1);
    expect(controller.getCurrentData()).toEqual(mockData[1]);
  });

  // Verify that previous() does not go below index 0
  test('should not go below index 0', () => {
    controller.previous();
    expect(controller.getCurrentIndex()).toBe(0);
  });

  // Ensure that next() does not go beyond the last data point
  test('should not go beyond last data point', () => {
    controller.setCurrentIndex(mockData.length - 1);
    controller.next();
    expect(controller.getCurrentIndex()).toBe(mockData.length - 1);
  });

  // Check that reset() always returns to the first data point
  test('should reset to beginning', () => {
    controller.setCurrentIndex(3);
    controller.reset();
    expect(controller.getCurrentIndex()).toBe(0);
  });

  // Verify that subscribers are notified when the index changes
  test('should notify subscribers when index changes', () => {
    const mockCallback = jest.fn();
    controller.subscribe(mockCallback);
    
    controller.next();
    expect(mockCallback).toHaveBeenCalledWith({
      currentIndex: 1,
      currentData: mockData[1]
    });
  });
});