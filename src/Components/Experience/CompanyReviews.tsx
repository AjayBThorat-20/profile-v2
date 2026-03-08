"use client";

import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaUserCircle, FaBriefcase, FaCalendar, FaChartLine, FaClock, FaThumbsUp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { REVIEW_FORM_URL } from "@/constants/experience";

interface Review {
  timestamp: string;
  username: string;
  fullName: string;
  role: string;
  department: string;
  monthsWorked: string;
  projects: string;
  businessLogicRating: number;
  fullStackRating: number;
  codeQualityRating: number;
  databaseRating: number;
  apiRating: number;
  systemImprovement: string;
  workloadReduction: string;
  timeSaved: string;
  uiUxRating: number;
  adaptabilityRating: number;
  recommendationScore: number;
  overallRating: number;
  workAgain: string;
  displayPermission: string;
}

export default function CompanyReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    // Check if the current company is Renewalytics (id: 2)
    const companyId = localStorage.getItem("selectedCompanyId");
    if (companyId === "2") {
      setShouldDisplay(true);
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Replace with your Google Sheets CSV export URL
      const SHEET_URL = "YOUR_GOOGLE_SHEETS_CSV_URL_HERE";
      
      // For demo purposes, using sample data
      const sampleData: Review[] = [
        {
          timestamp: "2026/03/06 3:01:21 PM GMT+5:30",
          username: "sahil.sheikh@renewalytics.in",
          fullName: "Sahil Sheikh",
          role: "Operation Analyst",
          department: "Operations Team",
          monthsWorked: "6-9 months",
          projects: "ReFlux",
          businessLogicRating: 5,
          fullStackRating: 5,
          codeQualityRating: 5,
          databaseRating: 5,
          apiRating: 5,
          systemImprovement: "61-80% improvement",
          workloadReduction: "61-80% reduction in workload",
          timeSaved: "30 minutes - 1 hour per day",
          uiUxRating: 4,
          adaptabilityRating: 5,
          recommendationScore: 10,
          overallRating: 5,
          workAgain: "Probably yes",
          displayPermission: "Yes, display my full name and review"
        },
        {
          timestamp: "2026/03/06 8:47:34 PM GMT+5:30",
          username: "shubham.gote@renewalytics.in",
          fullName: "Shubham Gote",
          role: "Data Engineer",
          department: "ML/AI Team",
          monthsWorked: "More than 12 months",
          projects: "ReFlux;ExcelFlow;RealSync",
          businessLogicRating: 4,
          fullStackRating: 4,
          codeQualityRating: 4,
          databaseRating: 4,
          apiRating: 4,
          systemImprovement: "61-80% improvement",
          workloadReduction: "61-80% reduction in workload",
          timeSaved: "1-2 hours per day",
          uiUxRating: 4,
          adaptabilityRating: 4,
          recommendationScore: 8,
          overallRating: 4,
          workAgain: "Definitely yes",
          displayPermission: "Yes, display my full name and review"
        },
        {
          timestamp: "2026/03/06 9:22:16 PM GMT+5:30",
          username: "ankita.shitole@renewalytics.in",
          fullName: "Ankita Shitole",
          role: "Meteorologist",
          department: "ML/AI Team",
          monthsWorked: "6-9 months",
          projects: "ReFlux",
          businessLogicRating: 5,
          fullStackRating: 5,
          codeQualityRating: 0,
          databaseRating: 0,
          apiRating: 0,
          systemImprovement: "81-100% improvement",
          workloadReduction: "Not applicable",
          timeSaved: "Not applicable",
          uiUxRating: 5,
          adaptabilityRating: 5,
          recommendationScore: 10,
          overallRating: 5,
          workAgain: "Definitely yes",
          displayPermission: "Yes, display my full name and review"
        },
        {
          timestamp: "2026/03/07 10:05:16 AM GMT+5:30",
          username: "piraj.shinde@renewalytics.in",
          fullName: "Piraj Shankar Shinde",
          role: "Jr. Full stack Developer",
          department: "Tech Team",
          monthsWorked: "9-12 months",
          projects: "ReFlux;ExcelFlow",
          businessLogicRating: 5,
          fullStackRating: 5,
          codeQualityRating: 5,
          databaseRating: 5,
          apiRating: 5,
          systemImprovement: "81-100% improvement",
          workloadReduction: "81-100% reduction in workload",
          timeSaved: "More than 4 hours per day",
          uiUxRating: 5,
          adaptabilityRating: 5,
          recommendationScore: 10,
          overallRating: 5,
          workAgain: "Definitely yes",
          displayPermission: "Yes, display my full name and review"
        }
      ];

      // Filter only reviews with display permission
      const displayableReviews = sampleData.filter(
        review => review.displayPermission.includes("Yes")
      );

      setReviews(displayableReviews);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch reviews. Please try again later.");
      setLoading(false);
    }
  };

  // Don't render anything if not Renewalytics
  if (!shouldDisplay) {
    return null;
  }

  const calculateAverageRating = (): string => {
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.overallRating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getGradientColors = (index: number) => {
    const gradients = [
      { from: "from-blue-600", to: "to-cyan-600", badge: "bg-blue-500/10 border-blue-500/20" },
      { from: "from-purple-600", to: "to-pink-600", badge: "bg-purple-500/10 border-purple-500/20" },
      { from: "from-green-600", to: "to-emerald-600", badge: "bg-green-500/10 border-green-500/20" },
      { from: "from-orange-600", to: "to-red-600", badge: "bg-orange-500/10 border-orange-500/20" },
    ];
    return gradients[index % gradients.length];
  };

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${sizeClass} ${
              i < rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  if (loading) {
    return (
      <div className="container-custom section">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-lg font-semibold text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom section">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4 glass-card p-8 rounded-3xl border-2 border-red-500/20">
            <p className="text-xl font-bold text-red-600">{error}</p>
            <button
              onClick={fetchReviews}
              className="btn-primary px-6 py-3"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="container-custom section">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Team Reviews</span>
          </div>
          <div className="glass-card p-8 rounded-3xl border-2 border-dashed border-border max-w-md mx-auto">
            <p className="text-xl font-bold text-foreground mb-2">No Reviews Yet</p>
            <p className="text-muted-foreground">Reviews will appear here once submitted.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-primary/20">
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Team Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black gradient-text-animated">
            What My Colleagues Say
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Authentic feedback from team members I've collaborated with at Renewalytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {/* Average Rating */}
          <div className="glass-card rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase">Average Rating</h3>
              <FaStar className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-foreground">{calculateAverageRating()}</span>
              <span className="text-2xl text-muted-foreground">/5</span>
            </div>
            <div className="mt-3">
              {renderStars(Math.round(parseFloat(calculateAverageRating())), "lg")}
            </div>
          </div>

          {/* Total Reviews */}
          <div className="glass-card rounded-2xl p-6 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase">Total Reviews</h3>
              <FaThumbsUp className="w-6 h-6 text-purple-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-foreground">{reviews.length}</span>
              <span className="text-2xl text-muted-foreground">reviews</span>
            </div>
          </div>

          {/* Recommendation Rate */}
          <div className="glass-card rounded-2xl p-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase">Would Work Again</h3>
              <FaChartLine className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-foreground">
                {Math.round((reviews.filter(r => r.workAgain.includes("yes")).length / reviews.length) * 100)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">positive responses</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviews.map((review, index) => {
            const colors = getGradientColors(index);
            
            return (
              <div
                key={index}
                className="group relative animate-fadeIn"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="relative bg-card border-2 border-border/50 hover:border-primary/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
                  {/* Top Gradient Bar */}
                  <div className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>

                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/5 ${colors.to}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative p-6 md:p-8 space-y-6">
                    
                    {/* Header with Avatar and Name */}
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full flex items-center justify-center shadow-xl ring-4 ring-background group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl font-black text-white">
                          {review.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>

                      {/* Name and Role */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl md:text-2xl font-black text-foreground">
                            {review.fullName}
                          </h3>
                          {/* Overall Rating Badge */}
                          <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                            <span className="text-xl font-black text-foreground">
                              {review.overallRating}
                            </span>
                            <FaStar className="w-4 h-4 text-yellow-500" />
                          </div>
                        </div>
                        
                        <p className="text-base font-bold text-primary mb-1">
                          {review.role}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.department}
                        </p>
                      </div>
                    </div>

                    {/* Quick Info Badges */}
                    <div className="flex flex-wrap gap-3">
                      {/* Duration Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border/50">
                        <FaCalendar className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          {review.monthsWorked}
                        </span>
                      </div>

                      {/* Projects Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border/50">
                        <FaBriefcase className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          {review.projects.split(';').length} project{review.projects.split(';').length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Performance Ratings */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
                          Performance Ratings
                        </h4>
                      </div>
                      
                      <div className="space-y-3">
                        {review.fullStackRating > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Full-Stack Expertise</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.fullStackRating ? "text-yellow-500" : "text-gray-300 dark:text-gray-700"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {review.uiUxRating > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">UI/UX Design</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.uiUxRating ? "text-yellow-500" : "text-gray-300 dark:text-gray-700"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {review.adaptabilityRating > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Adaptability</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.adaptabilityRating ? "text-yellow-500" : "text-gray-300 dark:text-gray-700"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Impact & Results */}
                    {(review.systemImprovement || review.workloadReduction !== "Not applicable") && (
                      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-5">
                        <div className="relative space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <h4 className="text-sm font-bold text-primary uppercase tracking-wide">
                              Impact & Results
                            </h4>
                          </div>
                          
                          <div className="space-y-2">
                            {review.systemImprovement && (
                              <div className="flex items-start justify-between gap-4">
                                <span className="text-sm font-medium text-muted-foreground">
                                  System Improvement:
                                </span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400 text-right">
                                  {review.systemImprovement}
                                </span>
                              </div>
                            )}
                            {review.workloadReduction !== "Not applicable" && (
                              <div className="flex items-start justify-between gap-4">
                                <span className="text-sm font-medium text-muted-foreground">
                                  Workload Reduction:
                                </span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 text-right">
                                  {review.workloadReduction}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer with Date and NPS */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-medium text-muted-foreground">
                        {formatDate(review.timestamp)}
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                        <span className="text-xs font-bold text-primary">
                          NPS: {review.recommendationScore}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Quote Icon */}
                  <div className="absolute top-6 right-6 pointer-events-none">
                    <div className={`p-3 bg-gradient-to-br ${colors.from}/10 ${colors.to}/10 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}>
                      <FaQuoteLeft className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Bottom Gradient Decoration */}
                  <div className={`h-1 bg-gradient-to-r ${colors.from} ${colors.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}