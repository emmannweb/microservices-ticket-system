export const rabbitWrapper = {
  client: {
    assertExchange: jest
      .fn()
      .mockImplementation(
        (exchangeName: string, exchangeType: string, options: any) => {
          console.log(exchangeName, exchangeType, options);
        }
      ),
    publish: jest.fn().mockImplementation((data: string) => {}),
  },
};
