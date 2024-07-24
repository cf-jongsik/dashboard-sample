type ResultSet = {
  accounts: [
    {
      zones: [
        {
          httpRequestsAdaptiveGroups: [
            {
              avg: {
                edgeDnsResponseTimeMs: number;
                edgeTimeToFirstByteMs: number;
                originResponseDurationMs: number;
              };
              dimensions: {
                datetimeFiveMinutes: string;
              };
            }
          ];
        }
      ];
    }
  ];
};
