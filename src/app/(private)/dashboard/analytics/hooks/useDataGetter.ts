'use client';

import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useAuth } from '../../../../core/AuthContext/context';

import { RequestType } from '../../../../core/constants/requestTypes';
import RequestServices from '../../core/request.services';

export function useDataGetter() {
  const { isp } = useAuth();

  const requestsQuery = useQuery({
    queryKey: ['requests', isp.id],
    queryFn: () => RequestServices.getRequests(isp.id),
    enabled: !!isp.id,
  });

  const requests = requestsQuery.data?.data || [];

  const monthlyData = useMemo(() => {
    const months: Record<string, any> = {};
    const monthOrder = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];

    requests.forEach((req) => {
      const month = DateTime.fromISO(req.createdAt)
        .setLocale('en')
        .toFormat('MMM')
        .toLowerCase();
      if (!months[month]) {
        months[month] = {
          name: month.charAt(0).toUpperCase() + month.slice(1),
          Petition: 0,
          Complaint: 0,
          Claim: 0,
          Suggestion: 0,
        };
      }

      if (req.type === RequestType.PETITION) months[month].Petition++;
      if (req.type === RequestType.COMPLAINT) months[month].Complaint++;
      if (req.type === RequestType.CLAIM) months[month].Claim++;
      if (req.type === RequestType.SUGGESTION) months[month].Suggestion++;
    });

    return Object.values(months).sort(
      (a, b) =>
        monthOrder.indexOf(a.name.toLowerCase()) -
        monthOrder.indexOf(b.name.toLowerCase()),
    );
  }, [requests]);

  // 2. Type Distribution for PieChart
  const typeData = useMemo(() => {
    const counts = { Petitions: 0, Complaints: 0, Claims: 0, Suggestions: 0 };

    requests.forEach((req) => {
      if (req.type === RequestType.PETITION) counts.Petitions++;
      if (req.type === RequestType.COMPLAINT) counts.Complaints++;
      if (req.type === RequestType.CLAIM) counts.Claims++;
      if (req.type === RequestType.SUGGESTION) counts.Suggestions++;
    });

    return [
      { name: 'Petitions', value: counts.Petitions, color: '#3b82f6' },
      { name: 'Complaints', value: counts.Complaints, color: '#ef4444' },
      { name: 'Claims', value: counts.Claims, color: '#f59e0b' },
      { name: 'Suggestions', value: counts.Suggestions, color: '#10b981' },
    ];
  }, [requests]);

  // 3. Request Status
  const statusData = useMemo(() => {
    const counts = { PENDING: 0, IN_PROGRESS: 0, RESOLVED: 0, CANCELED: 0 };
    requests.forEach((req) => {
      counts[req.status]++;
    });

    return [
      { name: 'Pending', value: counts.PENDING },
      { name: 'In Progress', value: counts.IN_PROGRESS },
      { name: 'Resolved', value: counts.RESOLVED },
      { name: 'Canceled', value: counts.CANCELED },
    ];
  }, [requests]);

  // 4. Average Response Time
  const responseTimeData = useMemo(() => {
    const totals: Record<string, { days: number; count: number }> = {
      PETITION: { days: 0, count: 0 },
      COMPLAINT: { days: 0, count: 0 },
      CLAIM: { days: 0, count: 0 },
      SUGGESTION: { days: 0, count: 0 },
    };

    requests.forEach((req) => {
      if (req.responses && req.responses.length > 0) {
        const start = DateTime.fromISO(req.createdAt);
        const end = DateTime.fromISO(req.responses[0].createdAt);
        const diff = end.diff(start, 'days').days;

        totals[req.type].days += Math.max(0, diff);
        totals[req.type].count++;
      }
    });

    return Object.entries(totals).map(([type, data]) => ({
      type:
        type === 'PETITION'
          ? 'Petition'
          : type === 'COMPLAINT'
            ? 'Complaint'
            : type === 'CLAIM'
              ? 'Claim'
              : 'Suggestion',
      days:
        data.count > 0 ? parseFloat((data.days / data.count).toFixed(1)) : 0,
    }));
  }, [requests]);

  return {
    requests,
    monthlyData,
    typeData,
    statusData,
    responseTimeData,
    isLoading: requestsQuery.isLoading,
  };
}
