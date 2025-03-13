export class TimeController {
  constructor(data = []) {
    this.data = data;
    this.currentIndex = 0; 
    this.subscribers = [];
  }
  
  getCurrentIndex() {
    return this.currentIndex;
  }
  
  getCurrentData() {
    return this.data[this.currentIndex];
  }
  
  setCurrentIndex(index) {
    if (index >= 0 && index < this.data.length) {
      this.currentIndex = index;
      this.notifySubscribers();
    }
  }
  
  next() {
    if (this.currentIndex < this.data.length - 1) {
      this.currentIndex++;
      this.notifySubscribers();
    }
  }
  
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.notifySubscribers();
    }
  }
  
  reset() {
    this.currentIndex = 0;
    this.notifySubscribers();
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
  
  notifySubscribers() {
    const stateUpdate = {
      currentIndex: this.currentIndex,
      currentData: this.getCurrentData()
    };
    
    this.subscribers.forEach(callback => callback(stateUpdate));
  }
}